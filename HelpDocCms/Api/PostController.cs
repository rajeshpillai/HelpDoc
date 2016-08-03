using BookReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookReview.Api
{
    public class PostController : ApiController
    {
        // GET: api/Book
        
        [ActionName("allposts")]
        public IEnumerable<Post> Get()
        {
            return StubData.Posts;
        }

        [ActionName("genres")]
        [HttpGet]
        public IEnumerable<Tag> Genres()
        {
            return StubData.Genres;
        }

        [ActionName("bygenre")]
        [HttpGet]
        public IEnumerable<Post> ByGenre(string id)
        {
            var gen = StubData.Genres.Find(g => g.TagName.ToLower() == id.ToLower());

            var posts = StubData.Posts.Where(b => b.Genres.Contains(gen));

            return posts;
        }

        // GET: api/Book/5
        [ActionName("byid")]
        public Post Get(int id)
        {
            var post = StubData.Posts.Where(b => b.Id == id).FirstOrDefault();
            post.NormalizedRating = (int)post.Ratings.Average(b => b.Value);
            return post;
        }

        [ActionName("reviewsbypost")]
        public List<Section> GetReviewsById(int id)
        {
            var post = StubData.Posts.Where(b => b.Id == id).FirstOrDefault();
            return post.Reviews;
        }

        // POST: api/Book/update

        [ActionName("update")]
        public int Post([FromBody]Post post)
        {
            post.Id = StubData.Posts.Count() + 1;
            StubData.Posts.Add(post);

            return post.Id;
        }

        [ActionName("upvote")]
        public void UpVote([FromUri] int postId, string username)
        {
            var post = StubData.Posts.Find(b => b.Id == postId);
            post.Rating++;
            post.Ratings.Add(new Rating
            {
                PostId = postId,
                Value = 5,
                Username = username
            });

        }

        [ActionName("downvote")]
        public void DownVote([FromUri] int postId, string username)
        {
            var post = StubData.Posts.Find(b => b.Id == postId);
            post.Rating--;
            post.Ratings.RemoveAt(0);
        }

        
        // POST: api/Book/review
        [ActionName("review")]
        public Section Post([FromBody]Section review, [FromUri]string username)
        {
            review.Id = StubData.Reviews.Count() + 1;
            review.Username = username;
            review.User = StubData.Users.Where(u => u.Username.ToLower() == username.ToLower()).FirstOrDefault();

            StubData.Reviews.Add(review);

            var post = StubData.Posts.Find(b => b.Id == review.PostId);
            post.Reviews.Add(review);

            return review;
        }

        // PUT: api/Book/5
        public void Put(int id, [FromBody]Post post)
        {
        }

        // DELETE: api/Book/5
        public void Delete(int id)
        {
            var post = StubData.Posts.Where(b => b.Id == id).FirstOrDefault();
            StubData.Posts.Remove(post);
        }
    }
}
