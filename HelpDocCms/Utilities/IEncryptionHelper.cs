using System;
namespace BookReview.Utilities
{
    public interface IEncryptionHelper
    {
        string EncodePassword(string pass, int passwordFormat, string salt);
    }
}
