angular.module("book.module").factory("BookConfig", function ($http) {
    return {
        apiUrl: 'api/book'
    };
});

angular.module("book.module").factory("LoginConfig", function () {
    return {
        apiUrl: 'api/auth'
    };
});