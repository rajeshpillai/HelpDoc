angular.module("post.module").directive("postThumbnail", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            posts: "=posts",
            tagFilter: "=",
            search: "="
        },
        templateUrl: "app/post/views/directives/post-thumbnail.html"
    };
});