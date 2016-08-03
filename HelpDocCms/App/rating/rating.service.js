//todo: inject baseUrl as value service
angular.module("book.module").service("RatingService", function ($http, BookConfig) {
    this.upVote = function (bookId, username) {
        return $http.post(BookConfig.apiUrl + "/upvote/?bookId=" + bookId + "&username=" + username  );
    };

    this.downVote = function (bookId, username) {
        return $http.post(BookConfig.apiUrl + "/downvote/?bookId=" + bookId + "&username=" + username);
    };
});