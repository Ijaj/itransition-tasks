using System;

namespace Game
{
    class InputValidation
    {
        private List<string> errors = new();
        private int totalMoves; // well i dont really need to store a copy of the moves here, just the length will do

        public InputValidation(string[] args)
        {
            // first, validate input and print error messages accordingly
            totalMoves = args.Length;
            if (totalMoves < 3)
            {
                errors.Add($"There must be at least 3 arguments. Received {totalMoves}.");
            }
            if (totalMoves % 2 == 0)
            {
                errors.Add($"Odd number of arguments are needed. Recieved {totalMoves}.");
            }

            Dictionary<string, List<int>> matches = new();

            for (int i = 0; i < totalMoves - 1; i++)
            {
                for (int j = i + 1; j < totalMoves; j++)
                {
                    if (args[i] == args[j])
                    {
                        if (matches.ContainsKey(args[i]))
                        {
                            if (!matches[args[i]].Contains(j)) matches[args[i]].Add(j);
                        }
                        else
                        {
                            matches.Add(args[i], new List<int> { i, j });
                        }
                    }
                }
            }

            if (matches.Count > 0)
            {
                string msg = "The input must not contain any duplicates. Found duplicates at the following indexes\n";
                string details = "";
                matches.Keys.ToList().ForEach(x => details += $"{x} at: {String.Join(", ", matches[x])}\n");
                errors.Add(msg + details);
            }
        }

        public void printErrors()
        {
            errors.ForEach(x => Console.WriteLine(x));
            Console.WriteLine("Please start the game again with valid inputs");
        }

        public bool isValid()
        {
            return errors.Count == 0;
        }

        public void reset() { errors = new List<string>(); }

        public bool isValidChoice(string choice, out int validChoice)
        {
            reset();
            // choice is input - 1,
            int parsed;
            if (int.TryParse(choice, out parsed))
            {
                parsed -= 1;
                if (parsed >= 0 && parsed < totalMoves)
                {
                    validChoice = parsed;
                    return true;
                }
                else
                {
                    validChoice = -1;
                    return false;
                }
            }
            else
            {
                validChoice = -2;
                return false;
            }

        }

        
        public static int getValidRound(string? _r){
            if(_r == null){
                return -3;
            }
            int parsed;
            if(int.TryParse(_r, out parsed)){
                if(parsed < 2){
                    return -1;
                }
                else return parsed;
            }
            else{
                return -2;
            }
        }
        
        public static string getErrorMessage(int errorCode)
        {
            if (errorCode == -1) return "Please chose a move number within the range of the moves";
            else if (errorCode == -2) return "Please chose a number as input";
            else return "Invalid Error Code";
        }
    }
}

