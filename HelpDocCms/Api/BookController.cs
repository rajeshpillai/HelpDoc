using BookReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookReview.Api
{
    public class BookController : ApiController
    {
        // GET: api/Book
        
        [ActionName("allbooks")]
        public IEnumerable<Book> Get()
        {
            return StubData.Books;
        }

        [ActionName("genres")]
        [HttpGet]
        public IEnumerable<Genre> Genres()
        {
            return StubData.Genres;
        }

        [ActionName("bygenre")]
        [HttpGet]
        public IEnumerable<Book> ByGenre(string id)
        {
            var gen = StubData.Genres.Find(g => g.TagName.ToLower() == id.ToLower());

            var books = StubData.Books.Where(b => b.Genres.Contains(gen));

            return books;
        }

        // GET: api/Book/5
        [ActionName("byid")]
        public Book Get(int id)
        {
            var book = StubData.Books.Where(b => b.Id == id).FirstOrDefault();
            book.NormalizedRating = (int)book.Ratings.Average(b => b.Rating);
            return book;
        }

        [ActionName("reviewsbybook")]
        public List<Review> GetReviewsById(int id)
        {
            var book = StubData.Books.Where(b => b.Id == id).FirstOrDefault();
            return book.Reviews;
        }

        // POST: api/Book/update

        [ActionName("update")]
        public int Post([FromBody]Book book)
        {
            book.Id = StubData.Books.Count() + 1;
            StubData.Books.Add(book);

            return book.Id;
        }

        [ActionName("upvote")]
        public void UpVote([FromUri] int bookId, string username)
        {
            var book = StubData.Books.Find(b => b.Id == bookId);
            book.Rating++;
            book.Ratings.Add(new BookRating
            {
                BookId = bookId,
                Rating = 5,
                Username = username
            });

        }

        [ActionName("downvote")]
        public void DownVote([FromUri] int bookId, string username)
        {
            var book = StubData.Books.Find(b => b.Id == bookId);
            book.Rating--;
            book.Ratings.RemoveAt(0);
        }

        
        // POST: api/Book/review
        [ActionName("review")]
        public Review Post([FromBody]Review review, [FromUri]string username)
        {
            review.Id = StubData.Reviews.Count() + 1;
            review.Username = username;
            review.User = StubData.Users.Where(u => u.Username.ToLower() == username.ToLower()).FirstOrDefault();

            StubData.Reviews.Add(review);

            var book = StubData.Books.Find(b => b.Id == review.BookId);
            book.Reviews.Add(review);

            return review;
        }

        // PUT: api/Book/5
        public void Put(int id, [FromBody]Book book)
        {
        }

        // DELETE: api/Book/5
        public void Delete(int id)
        {
            var book = StubData.Books.Where(b => b.Id == id).FirstOrDefault();
            StubData.Books.Remove(book);
        }
    }
}
