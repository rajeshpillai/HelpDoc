angular.module("book.module").directive("bookList", function () {
    return {
        restrict: "E",
        replace: true,
        scope:{
            books: "=books",
            genreFilter: "=",
            search: "="
        },
        templateUrl: "app/book/views/directives/booklist.html"
    };
});