using System.Collections.Generic;

namespace TaskSix.Models
{
    public class Board
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public List<DrawingItem>? Elements { get; set; }
    }
}