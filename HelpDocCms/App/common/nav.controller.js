angular.module("post.module").controller("nav.controller", function ($scope, $location) {
    $scope.loadAddView = function () {
        $location.url("/posts/create");
    };

    $scope.loadHomePage = function () {
        $location.url("/home");
    };
});