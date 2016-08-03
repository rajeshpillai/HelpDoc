angular.module("book.module").directive("bookThumbnail", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            books: "=books",
            genreFilter: "=",
            search: "="
        },
        templateUrl: "app/book/views/directives/bookthumbnail.html"
    };
});