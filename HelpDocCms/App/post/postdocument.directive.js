angular.module("post.module").directive("postDocument", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            posts: "=posts",
            tagFilter: "=",
            search: "="
        },
        templateUrl: "app/post/views/directives/post-document.html"
    };
});