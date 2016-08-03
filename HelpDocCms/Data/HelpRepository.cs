using Biggy;
using HelpDoc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Biggy.Extensions;

namespace HelpDoc.Data
{
    public class HelpDb
    {
        static string DB_PATH = HttpContext.Current.Server.MapPath("~/files");

        public BiggyList<Post> Posts = new BiggyList<Post>(DB_PATH);

        public BiggyList<Tag> Tags = new BiggyList<Tag>(DB_PATH);

        public BiggyList<Section> Sections = new BiggyList<Section>(DB_PATH);

        public BiggyList<AppUser> Users = new BiggyList<AppUser>(DB_PATH);

        public bool Save(Post post)
        {
            Posts.Add(post);
            Posts.Save();
            return true;
        }

        public List<Post> All ()
        {
            var posts =  Posts.TryLoadFileData(DB_PATH + "/posts.json");
            return posts;
        }
    }
}