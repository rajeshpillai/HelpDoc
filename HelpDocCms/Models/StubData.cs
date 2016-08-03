using BookReview.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public static class StubData
    {
        public static List<Post> Posts = new List<Post>();
        public static List<AppUser> Users = new List<AppUser>();
        public static List<Section> Reviews = new List<Section>();
        public static List<Rating> Ratings = new List<Rating>();

        //public static List<string> Genres = new List<string>();
        public static List<Tag> Genres = new List<Tag>();
        static StubData()
        {
            Genres.Add(new Tag("Fiction"));
            Genres.Add(new Tag("Programming"));
            Genres.Add(new Tag("Crime"));
            Genres.Add(new Tag("Suspense"));
            Genres.Add(new Tag("Thriller"));
            Genres.Add(new Tag("Classic"));

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
                var post = new Post
                {
                    Author = "Author " + i.ToString(),
                    Title = "Book " + i.ToString(),
                    Url = "<a target='_blank' href='https://leanpub.com/qlikview-recipes'>Book webpage</a>",
                    Id = i,
                    ImageUrl = "/uploads/posts/" + (i % 2 == 0 ? "1.png" : "2.png"),
                    PublishedOn = DateTime.Now.AddDays(-i),
                    ReadingTime = rndDuration.Next(1, 12),
                    Description = "Over a good boook "
                    
                    //Genre = Genres.ElementAt(rndDuration.Next(1, Genres.Count))
                };

                var genCount = rndDuration.Next(1, Genres.Count);

                for (var g = 0; g < genCount; g++)
                {
                    post.Genres.Add(Genres[g]);
                    //Genres[g].Books.Add(post);
                }

                if (i % 2 == 0) reviewCount = 20;  // random review count

                for (var j = 1; j <= reviewCount; j++)
                {
                    var u = Users[j % 5];
                    var review = new Section
                    {
                        Title = "Review of " + post.Title,
                        Body = "An excellent post, " + post.Title ,
                        PostId = post.Id,
                        Id = i*j,
                        Username = u.Username,
                        User = u
                    };

                    Random rnd = new Random();
                    var rating = new Rating
                    {
                        PostId = post.Id,
                        Username = u.Username,
                        Value =  rnd.Next(0,5)
                    };

                    post.Reviews.Add(review);
                    post.Ratings.Add(rating);

                    Ratings.Add(rating);
                    Reviews.Add(review);

                }

                Posts.Add(post);
            }
        }
    }
 
}