angular.module("book.module").controller("nav.controller", function ($scope, $location) {
    $scope.loadAddView = function () {
        $location.url("/books/create");
    };

    $scope.loadHomePage = function () {
        $location.url("/home");
    };
});