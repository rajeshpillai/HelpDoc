angular.module("post.module").directive("postList", function () {
    return {
        restrict: "E",
        replace: true,
        scope:{
            posts: "=posts",
            genreFilter: "=",
            search: "="
        },
        templateUrl: "app/post/views/directives/postlist.html"
    };
});