using BookReview.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public static class StubData
    {
        public static List<Book> Books = new List<Book>();
        public static List<AppUser> Users = new List<AppUser>();
        public static List<Review> Reviews = new List<Review>();
        public static List<BookRating> Ratings = new List<BookRating>();

        //public static List<string> Genres = new List<string>();
        public static List<Genre> Genres = new List<Genre>();
        static StubData()
        {
            Genres.Add(new Genre("Fiction"));
            Genres.Add(new Genre("Programming"));
            Genres.Add(new Genre("Crime"));
            Genres.Add(new Genre("Suspense"));
            Genres.Add(new Genre("Thriller"));
            Genres.Add(new Genre("Classic"));

            SetupData();

        }
        public static void SetupData()
        {
            var encryption = new EncryptionHelper();
            string salt = SecurityUtil.GenerateSalt();

            // Create some users
            for (var i = 1; i <= 5; i++)
            {
                var user = new AppUser
                {
                    Id = 1,
                    Username = "user" + i.ToString(),
                    Password = encryption.EncodePassword("123456", 1, salt)
                };

                Users.Add(user);

            }

            // create an admin user
            var admin = new AppUser
            {
                Id = 99,
                Username = "admin",
                Password = encryption.EncodePassword("123456", 1, salt),
                IsAdmin = true
            };

            Users.Add(admin);


            int reviewCount = 10;

            Random rndDuration = new Random();
                    
            for (var i = 1; i <= 20; i++)
            {
                var book = new Book
                {
                    Author = "Author " + i.ToString(),
                    BookName = "Book " + i.ToString(),
                    BookUrl = "<a target='_blank' href='https://leanpub.com/qlikview-recipes'>Book webpage</a>",
                    Id = i,
                    BookImageUrl = "/uploads/books/" + (i % 2 == 0 ? "1.png" : "2.png"),
                    PublishedOn = DateTime.Now.AddDays(-i),
                    ReadingTime = rndDuration.Next(1, 12),
                    Description = "Over a good boook "
                    
                    //Genre = Genres.ElementAt(rndDuration.Next(1, Genres.Count))
                };

                var genCount = rndDuration.Next(1, Genres.Count);

                for (var g = 0; g < genCount; g++)
                {
                    book.Genres.Add(Genres[g]);
                    //Genres[g].Books.Add(book);
                }

                if (i % 2 == 0) reviewCount = 20;  // random review count

                for (var j = 1; j <= reviewCount; j++)
                {
                    var u = Users[j % 5];
                    var review = new Review
                    {
                        Title = "Review of " + book.BookName,
                        Body = "An excellent book, " + book.BookName ,
                        BookId = book.Id,
                        Id = i*j,
                        Username = u.Username,
                        User = u
                    };

                    Random rnd = new Random();
                    var rating = new BookRating
                    {
                        BookId = book.Id,
                        Username = u.Username,
                        Rating =  rnd.Next(0,5)
                    };

                    book.Reviews.Add(review);
                    book.Ratings.Add(rating);

                    Ratings.Add(rating);
                    Reviews.Add(review);

                }

                Books.Add(book);
            }
        }
    }
 
}