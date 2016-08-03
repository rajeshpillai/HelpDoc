//todo: inject baseUrl as value service
angular.module("post.module").service("RatingService", function ($http, PostConfig) {
    this.upVote = function (postId, username) {
        return $http.post(PostConfig.apiUrl + "/upvote/?postId=" + postId + "&username=" + username  );
    };

    this.downVote = function (postId, username) {
        return $http.post(PostConfig.apiUrl + "/downvote/?postId=" + postId + "&username=" + username);
    };
});