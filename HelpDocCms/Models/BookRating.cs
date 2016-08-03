using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public class BookRating
    {
        public int BookId { get; set; }
        public string Username { get; set; }

        public int Rating { get; set; }
    }
}