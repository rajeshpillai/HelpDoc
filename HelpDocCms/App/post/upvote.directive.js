'use strict';

/* todo: directive with isolate scope */
angular.module("post.module").directive("upvote", function () {
    return {
        restrict: "E",
        templateUrl: "app/post/views/directives/upvote.html",
        scope: {
            upvote: "&",
            downvote: "&",
            count:"="
        }
    };
});