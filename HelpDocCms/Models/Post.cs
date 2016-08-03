using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookReview.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        public string Description { get; set; }

        [StringLength(50)]
        public string Author { get; set; }

        [StringLength(255)]
        public string Url { get; set; }

        public string ImageUrl { get; set; }

        public double ReadingTime { get; set; }

        public DateTime PublishedOn { get; set; }

        public int NormalizedRating { get; set; }
        public int Rating { get; set; }

        public List<Section> Reviews { get; set; }
        public List<Rating> Ratings { get; set; }

        public List<Tag> Genres { get; set; }
        public Post()
        {
            Reviews = new List<Section>();
            Ratings = new List<Rating>();
            Genres = new List<Tag>();
        }

    }
}