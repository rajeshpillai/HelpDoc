'use strict';

/* todo: directive with isolate scope */
angular.module("book.module").directive("upvote", function () {
    return {
        restrict: "E",
        templateUrl: "app/book/views/directives/upvote.html",
        scope: {
            upvote: "&",
            downvote: "&",
            count:"="
        }
    };
});