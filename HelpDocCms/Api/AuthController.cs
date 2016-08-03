using BookReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookReview.Api
{
    public class AuthController : ApiController
    {
        // GET: api/Book
        
        [ActionName("token")]
        public string Token(AppUser user)
        {
            return Guid.NewGuid().ToString();
        }

    }
}
