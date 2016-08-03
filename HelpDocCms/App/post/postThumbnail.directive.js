angular.module("post.module").directive("postThumbnail", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            posts: "=posts",
            genreFilter: "=",
            search: "="
        },
        templateUrl: "app/post/views/directives/postthumbnail.html"
    };
});