using HelpDoc.Data;
using HelpDoc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HelpDoc.Api
{
    public class PostController : ApiController
    {
        HelpDb db = new HelpDb();

        [ActionName("allposts")]
        public IEnumerable<Post> Get()
        {
            //return StubData.Posts;
            return db.All();
        }

        [ActionName("tags")]
        [HttpGet]
        public IEnumerable<Tag> Tags()
        {
            return db.Tags;
        }

        [ActionName("bytag")]
        [HttpGet]
        public IEnumerable<Post> ByTag(string id)
        {
            var tag = db.Tags.Where(g => g.TagName.ToLower() == id.ToLower()).FirstOrDefault();
            var posts = db.Posts.Where(b => b.Tags.Contains(tag));

            return posts;
        }

        // GET: api/Book/5
        [ActionName("byid")]
        public Post Get(int id)
        {
            var post = db.Posts.Where(b => b.Id == id).FirstOrDefault();
            //post.NormalizedRating = (int)post.Ratings.Average(b => b.Value);
            return post;
        }

        [ActionName("sectionsbypost")]
        public List<Section> GetSectionsById(int id)
        {
            var post = db.Posts.Where(b => b.Id == id).FirstOrDefault();
            return post.Sections;
        }

        // POST: api/Book/create

        [ActionName("create")]
        public int Create([FromBody]Post post)
        {
            if (db.Posts.Count == 0)
            {
                post.Id = 1;
                post.SortOrder = 1;
            }
            else
            {
                post.Id = db.Posts.Max(p => p.Id) + 1;
                post.SortOrder = db.Posts.Max(p => p.SortOrder) + 1;

            }
            post.CreatedBy = "admin";
            db.Posts.Add(post);
            db.Update(post);
            return post.Id;
        }

        [ActionName("update")]
        public int Update([FromBody]Post post)
        {   

            db.Update(post);
            return post.Id;
        }

        [ActionName("upvote")]
        public void UpVote([FromUri] int postId, string username)
        {
            var post = db.Posts.Where(b => b.Id == postId).FirstOrDefault();
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
            var post = db.Posts.Where(b => b.Id == postId).FirstOrDefault();
            post.Rating--;
            post.Ratings.RemoveAt(0);
        }

        
        // POST: api/Book/section
        [ActionName("section")]
        public Section Post([FromBody]Section section, [FromUri]string username)
        {
            section.Id = db.Sections.Count() + 1;
            section.Username = username;
            section.User = db.Users.Where(u => u.Username.ToLower() == username.ToLower()).FirstOrDefault();

            db.Sections.Add(section);

            var post = db.Posts.Where(b => b.Id == section.PostId).FirstOrDefault();
            post.Sections.Add(section);

          
            return section;
        }

        // PUT: api/Book/5
        public void Put(int id, [FromBody]Post post)
        {
        }

        [ActionName("remove")]
        [HttpPost]
        public void Delete(int id)
        {
            var post = db.Posts.Where(b => b.Id == id).FirstOrDefault();
            db.Delete(post);
        }
    }
}
