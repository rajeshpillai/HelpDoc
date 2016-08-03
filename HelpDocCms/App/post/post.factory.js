//todo: inject baseUrl as value service
angular.module("post.module").factory("PostFactory", function ($http, PostConfig) {
    //var baseUrl = "api/post"
    return {
        getAll: function () {
            return $http.get(PostConfig.apiUrl + "/allposts");
        },
        getById: function (id) {
            return $http.get(PostConfig.apiUrl + '/byid/' + id);
        },
        getReviewsById: function (id) {
            return $http.get(PostConfig.apiUrl + '/reviewsbypost/' + id);
        },
        update: function (post) {
            return $http.post(PostConfig.apiUrl + "/update/", post);
        },
        genres: function () {
            return $http.get(PostConfig.apiUrl + "/genres");
        },
        getByGenre: function (genre) {
            return $http.get(PostConfig.apiUrl + "/bygenre/" + genre);
        }
    }
});