namespace TastFrour.Requests
{
    namespace UserRequest
    {
        public class Update
        {
            public int Id { get; set; }
            public required int[] Ids { get; set; }
            public required int Status { get; set; }
        }

        public class LoginRegister
        {
            public string Name { get; set; } = "";
            public required string Email { get; set; }
            public required string Password { get; set; }
        }

        public class Delete
        {
            public int Id { get; set; }
            public required int[] Ids { get; set; }
        }
    }
}