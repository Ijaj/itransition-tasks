using ConsoleTables;
using System.Linq;

namespace Game
{
    class UI
    {
        private static string[] menu = { };

        public static void init(string[] args)
        {
            menu = args;
        }

        public static int getRounds(){
            Console.Write("Enter the number of rounds you want to play: ");
            string? _rounds = Console.ReadLine();
            return InputValidation.getValidRound(_rounds);
        }

        public static void displayRoundError(int roundError){
            if(roundError == -1){
                Console.WriteLine("You have to play at least 2 rounds");
            }
            else{
                Console.WriteLine("Please enter a number");
            }
        }

        public static void displayMenu()
        {
            Console.WriteLine("Select Your Move");
            for (int i = 0; i < menu.Length; i++)
            {
                Console.WriteLine($"{i + 1}: {menu[i]}");
            }
        }

        public static void displayRound(int round, int moveCount)
        {
            Console.WriteLine();
            Console.WriteLine($"Round: {round + 1}, move: {moveCount + 1}");
        }

        public static string takeInput()
        {
            Console.WriteLine("------------------------------------------------------------");
            Console.Write("Your Move: ");  
            string? input = Console.ReadLine();
            Console.WriteLine();
            return input == null ? "" : input;
        }

        public static void displayInputError(string input, int errorCode)
        {
            Console.WriteLine($"Invalid input {input}");
            Console.WriteLine(InputValidation.getErrorMessage(errorCode));
        }

        public static void displayMove(string moveBy, string hmac = "")
        {
            Console.WriteLine($"{moveBy} made move.");
            if (hmac.Length > 0) Console.WriteLine($"HMAC: {hmac}");
        }

        public static void displayWinTable(int[] playerResults)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("__________________________________");
            Console.WriteLine();
            Console.WriteLine("Win Table");
            Console.WriteLine();
            int n = playerResults.Length;
            int maxHeaderLength = Math.Max(n.ToString().Length, "Players/Rounds".Length);

            string[] headers = new string[n + 1];
            headers[0] = "Players/Rounds".PadRight(maxHeaderLength);
            for (int i = 0; i < n; i++)
            {
                headers[i + 1] = (i + 1).ToString().PadRight(maxHeaderLength);
            }

            // Table data
            string[,] tableData = new string[3, n + 1];
            tableData[0, 0] = headers[0];
            tableData[1, 0] = "Player".PadRight(maxHeaderLength);
            tableData[2, 0] = "CPU".PadRight(maxHeaderLength);

            for (int i = 0; i < n; i++)
            {
                tableData[0, i + 1] = headers[i + 1];
                tableData[1, i + 1] = (playerResults[i] == -1 ? "WIN" : playerResults[i] == 1 ? "LOSE" : "DRAW").PadLeft(maxHeaderLength);
                tableData[2, i + 1] = (playerResults[i] == -1 ? "LOSE" : playerResults[i] == 1 ? "WIN" : "DRAW").PadLeft(maxHeaderLength);
            }

            PrintTable(tableData);
            Console.WriteLine();
        }

        public static void displayHelpTable(int[,] matrix)
        {
            int n = menu.Length;
            int maxHeaderLength = Math.Max(menu.Max(h => h.Length), "CPU/Player".Length);

            var paddedHeaders = menu.Select(h => h.PadRight(maxHeaderLength)).ToArray();

            var tableData = new string[n + 1, n + 1];
            tableData[0, 0] = "CPU/Player".PadRight(maxHeaderLength);
            for (int i = 0; i < n; i++)
            {
                tableData[0, i + 1] = paddedHeaders[i];
                tableData[i + 1, 0] = paddedHeaders[i];
                for (int j = 0; j < n; j++)
                {
                    string text = matrix[i, j] == 0 ? "Draw" : matrix[i, j] == 1 ? "Lose" : "Win";
                    tableData[i + 1, j + 1] = text.PadLeft(maxHeaderLength);
                }
            }
            PrintTable(tableData);
        }

        static void PrintTable(string[,] tableData)
        {
            int rows = tableData.GetLength(0);
            int cols = tableData.GetLength(1);
            int[] colWidths = Enumerable.Range(0, cols).Select(col => Enumerable.Range(0, rows).Max(row => tableData[row, col].Length)).ToArray();

            // Top border
            PrintRowSeparator(colWidths);

            // Headers
            for (int col = 0; col < cols; col++)
            {
                Console.Write("| " + tableData[0, col].PadRight(colWidths[col]) + " ");
            }
            Console.WriteLine("|");

            // Separator after headers
            PrintRowSeparator(colWidths);

            // Data rows
            for (int row = 1; row < rows; row++)
            {
                for (int col = 0; col < cols; col++)
                {
                    Console.Write("| " + tableData[row, col].PadRight(colWidths[col]) + " ");
                }
                Console.WriteLine("|");
                PrintRowSeparator(colWidths);
            }
        }

        static void PrintRowSeparator(int[] colWidths)
        {
            Console.Write("+");
            foreach (int width in colWidths)
            {
                Console.Write(new string('-', width + 2) + "+");
            }
            Console.WriteLine();
        }

        public static void displayRoundWinner(int playerMove, int cpuMove, int result)
        {
			Console.WriteLine("============================================================");
            Console.WriteLine($"Player move: {menu[playerMove]}.");
            Console.WriteLine($"CPU move: {menu[cpuMove]}.");
			string winner = result == -1 ? "Player Wins" : result == 1 ? "CPU Wins" : "DRAW";
            Console.WriteLine(winner);
            Console.WriteLine("============================================================");
        }
    }
}
