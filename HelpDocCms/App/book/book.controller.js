angular.module("book.module").controller('book.controller', function ($scope, $route, $location, $routeParams,  BookFactory) {
    $scope.message = "Book details";

    var id = $routeParams.id;


    BookFactory.getById(id).success(function (data) {
        $scope.book = data;
    });

    // addnew book
    $scope.update = function () {
        var book = this.book;
        BookFactory.update(this.book).success(function (id) {
            book.id = id;
            $location.url("/home");
            //$scope.books.push(book);
        });
    };
});