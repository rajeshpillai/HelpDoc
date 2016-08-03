using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string BookName { get; set; }

        public string Description { get; set; }

        [StringLength(50)]
        public string Author { get; set; }

        [StringLength(255)]
        public string BookUrl { get; set; }

        public string BookImageUrl { get; set; }

        public double ReadingTime { get; set; }

        //public string Genre { get; set; }

        public DateTime PublishedOn { get; set; }

        public int NormalizedRating { get; set; }
        public int Rating { get; set; }

        public List<Review> Reviews { get; set; }
        public List<BookRating> Ratings { get; set; }

        public List<Genre> Genres { get; set; }
        public Book()
        {
            Reviews = new List<Review>();
            Ratings = new List<BookRating>();
            Genres = new List<Genre>();
        }

    }
}