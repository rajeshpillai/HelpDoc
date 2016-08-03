using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public class Genre
    {
        public string TagName { get; set; }

        public List<Book> Books { get; set; }
        public Genre(string tagName)
        {
            this.TagName = tagName;
            Books = new List<Book>();
        }
    }
}