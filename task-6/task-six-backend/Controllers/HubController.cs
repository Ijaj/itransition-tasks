using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TaskSix.Hubs;
using TaskSix.Models;

namespace TaskSix.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HubController : ControllerBase
    {
        private readonly IHubContext<DrawingHub> _context;

        public HubController(IHubContext<DrawingHub> context)
        {
            _context = context;
        }
    }
}