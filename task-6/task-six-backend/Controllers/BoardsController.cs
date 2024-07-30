using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskSix.Data;
using TaskSix.Models;

namespace TaskSix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoardsController : ControllerBase
    {
        private readonly DrawingDbContext _context;

        public BoardsController(DrawingDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Board>> CreateBoard([FromBody] string name)
        {
            var board = new Board { Id = Guid.NewGuid().ToString(), Name = name };
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBoard), new { id = board.Id }, board);
        }

        // update, add new stuffs
        [HttpPost("{id}")]
        public async Task<ActionResult<Board>> UpdateBoard([FromBody] string name)
        {
            var board = new Board { Id = Guid.NewGuid().ToString(), Name = name };
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBoard), new { id = board.Id }, board);
        }

        [HttpGet()]
        public async Task<ActionResult<List<Board>>> GetBoard()
        {
            var board = await _context.Boards.Include(b => b.Elements).ToListAsync();

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Board>> GetBoard(string id)
        {
            var board = await _context.Boards
                .Include(b => b.Elements)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }
    }
}