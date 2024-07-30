using System.Security.Cryptography;
using System.Text;

namespace Game
{
    class HMAC
    {
        public static string getHmac(int move)
        {
            byte[] moveBytes = Encoding.UTF8.GetBytes(move.ToString());
            byte[] sKeyBytes = generateKey();

            var hmac = new HMACSHA256(sKeyBytes);
            byte[] hashByte = hmac.ComputeHash(moveBytes);
            return Convert.ToBase64String(hashByte);
        }

        private static byte[] generateKey()
        {
            byte[] key = new byte[32];
            RandomNumberGenerator.Fill(key);
            return key;
        }
    }
}

