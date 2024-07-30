using Microsoft.EntityFrameworkCore;
using TaskSix.Models;

namespace TaskSix.Data
{
    public class DrawingDbContext : DbContext
    {
        public DrawingDbContext(DbContextOptions<DrawingDbContext> options) : base(options){}
        public DbSet<Board> Boards { get; set; }
        public DbSet<DrawingItem> DrawingElements { get; set; }
    }
}