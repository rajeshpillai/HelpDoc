﻿angular.module("post.module").directive("postList", function () {
    return {
        restrict: "E",
        replace: true,
        scope:{
            posts: "=posts",
            tagFilter: "=",
            search: "="
        },
        templateUrl: "app/post/views/directives/post-list.html"
    };
});