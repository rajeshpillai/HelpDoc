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
        getSectionsById: function (id) {
            return $http.get(PostConfig.apiUrl + '/sectionsbypost/' + id);
        },
        update: function (post) {
            return $http.post(PostConfig.apiUrl + "/update/", post);
        },
        tags: function () {
            return $http.get(PostConfig.apiUrl + "/tags");
        },
        getByTag: function (tag) {
            return $http.get(PostConfig.apiUrl + "/bytag/" + tag);
        }
    }
});