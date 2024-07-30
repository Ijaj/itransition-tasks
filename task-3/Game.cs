using System.Security.Cryptography;
using Game;

namespace Game
{
    class GameRunner
    {
        private bool playerTurn = false; // start with computer turn first
        private List<string> cpuHmac = new List<string>();

        private int n, half, lastPlayerMove = -1, lastCPUMove = -1;
        int[,] winMatrix;
        // UI uI;
        int rounds;
        int[] wins;   // 0 = cpu wins, 1 = player wins. initialize with all cpu wins
        const int numberOfMovesPerRound = 2;
        int moveCount = 0;
        int totalPlayerWins = 0;
        int totalCPUWins = 0;
        Random rnd;

        public GameRunner(string[] args)
        {
            setRounds();
            rnd = new Random();
            UI.init(args);
            n = args.Length;
            half = n / 2;
            winMatrix = new int[n, n];

            for (int y = 0; y < n; y++)
            {
                for (int x = 0; x < n; x++)
                {
                    winMatrix[x, y] = Math.Sign((x - y + half + n) % n - half);
                }
            }

            Console.WriteLine("Help Table");
            UI.displayHelpTable(winMatrix);
        }

        public void start(InputValidation iv)
        {
            int i = 0;
            while (i < rounds)
            {
                if (moveCount == numberOfMovesPerRound)
                {
                    moveCount = 0;
                    bool p_win = didPlayerWin();
                    if (p_win) totalPlayerWins += 1;
                    else totalCPUWins += 1;

                    UI.displayRoundWinner(lastPlayerMove, lastCPUMove, p_win ? "Player" : "CPU");

                    wins[i] = p_win ? 1 : 0;
                    i += 1;
                    if (i == rounds) break;
                }
                UI.displayRound(i, moveCount);
                if (playerTurn)
                {
                    // maybe player does not need an HMAC. do moves directly
                    UI.displayMenu();

                    string input = UI.takeInput();
                    int parsedInput;

                    bool _isValidChoice = iv.isValidChoice(input, out parsedInput);
                    if (_isValidChoice)
                    {
                        playerTurn = false;
                        lastPlayerMove = parsedInput;
                        UI.displayMove("Player");
                        moveCount += 1;
                    }
                    else
                    {
                        UI.displayInputError(input, parsedInput);
                        continue;
                    }
                }
                else
                {
                    int cpuMove = rnd.Next(0, n);
                    lastCPUMove = cpuMove;
                    string cpuMoveHmac = HMAC.getHmac(lastCPUMove);
                    cpuHmac.Add(cpuMoveHmac);
                    UI.displayMove("CPU", cpuMoveHmac);
                    playerTurn = true;
                    moveCount += 1;
                }
            }
            // display wins
            UI.displayWinTable(wins);
        }

        public void setRounds()
        {
            rounds = UI.getRounds();
            if (rounds < 0)
            {
                UI.displayRoundError(rounds);
                setRounds();
            }
            else
            {
                wins = new int[rounds];
            }
        }

        private bool didPlayerWin()
        {
            return winMatrix[lastCPUMove, lastPlayerMove] == -1;
        }
    }
}
