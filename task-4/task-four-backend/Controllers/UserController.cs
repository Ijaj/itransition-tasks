using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TastFrour.Data;
using TastFrour.Models;
using TastFrour.Requests;
using Microsoft.AspNetCore.Authorization;
using MySqlConnector;


namespace TastFrour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<User>>> GetUsers(int userId)
        {
            if (await isUserDeletedOrBlocked(userId))
            {
                return Unauthorized("You were either blocked or deleted by other users");
            }
            List<User> allUsers = await _context.Users.ToListAsync();
            allUsers.ForEach((user) =>
            {
                user.PasswordHash = "";
            });
            return Ok(allUsers);
        }

        [Authorize]
        [HttpGet("{id}/{userId}")]
        public async Task<ActionResult<User>> GetUser(int id, int userId)
        {
            if (await isUserDeletedOrBlocked(userId))
            {
                return Unauthorized("You were either blocked or deleted by other users");
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> PostUser([FromBody] Requests.UserRequest.LoginRegister regReq)
        {
            if (string.IsNullOrEmpty(regReq.Password))
            {
                return BadRequest("Password field cannot be empty");
            }
            Console.WriteLine(regReq.Email);

            User? existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == regReq.Email);
			string token = "";

            if (existingUser != null)
            {
                if (existingUser.Status == 1)
                {
                    return Conflict("An account with this email already exists.");
                }
                else
                {
                    existingUser.Status = 1;
                    existingUser.Name = regReq.Name;
                    existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(regReq.Password);
                    _context.Entry(existingUser).State = EntityState.Modified;
                    int rowsAffected = await _context.SaveChangesAsync();
					token = JWToken.GenerateJwtToken(existingUser, _configuration);
                    return Ok(new {rows = rowsAffected, id = existingUser.Id, token});
                }
            }

            User newUser = new User
            {
                Name = regReq.Name,
                Email = regReq.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(regReq.Password),
                RegistrationTime = DateTime.UtcNow,
                LastLoginTime = DateTime.UtcNow,
                Status = 1
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            token = JWToken.GenerateJwtToken(newUser, _configuration);
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id, userId = newUser.Id }, new { id = newUser.Id, token });
        }

        [HttpPost("login")]
        public async Task<ActionResult> UpdateLastLogin(Requests.UserRequest.LoginRegister loginData)
        {
            User? user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginData.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            if (await isUserDeletedOrBlocked(user.Id))
            {
                return Unauthorized("You were either blocked or deleted by other users. Register Again");
            }

            string token = JWToken.GenerateJwtToken(user, _configuration);

            user.LastLoginTime = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Id = user.Id,
                token = token
            });
        }

        // UPDATE CONTROLLER
        [Authorize]
        [HttpPut("{userId}")]
        public async Task<ActionResult> PutUser(int userId, Requests.UserRequest.Update updateReq)
        {
            if (await isUserDeletedOrBlocked(userId))
            {
                return Unauthorized("You were either blocked or deleted by other users");
            }
            else if (updateReq.Ids.Length == 0)
            {
                return BadRequest("No user ids provided");
            }
            else if (!(updateReq.Status == 0 || updateReq.Status == 1))
            {
                return BadRequest("Invalid Status value selected");
            }

            List<User> users = _context.Users.Where(u => updateReq.Ids.Contains(u.Id)).ToList();
            users.ForEach(u => u.Status = updateReq.Status);
            int rowsAffected = await _context.SaveChangesAsync();
            return Ok(rowsAffected);
        }

        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> DeleteUser([FromBody] Requests.UserRequest.Delete deleteReq)
        {
            if (await isUserDeletedOrBlocked(deleteReq.Id))
            {
                return Unauthorized("You were either blocked or deleted by other users");
            }
            else if (deleteReq.Ids.Length == 0)
            {
                return BadRequest("No user ids provided");
            }

            User[] users = _context.Users.Where(u => deleteReq.Ids.Contains(u.Id)).ToArray();
            _context.Users.RemoveRange(users);
            int rowsAffected = await _context.SaveChangesAsync();

            return Ok(rowsAffected);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private string getParamsString(int[] ids)
        {
            return String.Join(";", ids.Select((val, i) => $"@p{i}"));
        }

        private MySqlParameter[] getParamsSql(int[] ids)
        {
            return ids.Select((val, i) => new MySqlParameter($"@p{i}", val)).ToArray();
        }

        private async Task<bool> isUserDeletedOrBlocked(int id)
        {
            User? user = await _context.Users.FindAsync(id);
            return user == null || user.Status == 0;
        }
    }
}
