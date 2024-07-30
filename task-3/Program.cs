using System.Linq;
using System.Collections.Generic;
using Game;

class Program
{
    public static void Main(string[] args)
    {
        InputValidation iv = new InputValidation(args);
        if(!iv.isValid()){
            iv.printErrors();
            return;
        }

        GameRunner g = new GameRunner(args);
        g.start(iv);
    }
}
