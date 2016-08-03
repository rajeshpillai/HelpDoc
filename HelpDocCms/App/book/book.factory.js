//todo: inject baseUrl as value service
angular.module("book.module").factory("BookFactory", function ($http, BookConfig) {
    //var baseUrl = "api/book"
    return {
        getAll: function () {
            return $http.get(BookConfig.apiUrl + "/allbooks");
        },
        getById: function (id) {
            return $http.get(BookConfig.apiUrl + '/byid/' + id);
        },
        getReviewsById: function (id) {
            return $http.get(BookConfig.apiUrl + '/reviewsbybook/' + id);
        },
        update: function (book) {
            return $http.post(BookConfig.apiUrl + "/update/", book);
        },
        genres: function () {
            return $http.get(BookConfig.apiUrl + "/genres");
        },
        getByGenre: function (genre) {
            return $http.get(BookConfig.apiUrl + "/bygenre/" + genre);
        }
    }
});