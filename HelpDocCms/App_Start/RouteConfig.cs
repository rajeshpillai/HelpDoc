using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HelpDoc
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "",
                url: "Home/about/{id}",
                defaults: new { controller = "Home", action = "about", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "",
                url: "Home/contact/{id}",
                defaults: new { controller = "Home", action = "contact", id = UrlParameter.Optional }
            );

            /* note: for html5 routing */
            routes.MapRoute(
              name: "Default",
              url: "{*anything}",
              defaults: new
              {
                  controller = "Home",
                  action = "Index",
              }

          );

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}
