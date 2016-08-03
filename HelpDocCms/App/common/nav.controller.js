angular.module("post.module").controller("nav.controller", function ($scope, $location, $state) {
    $scope.loadAddView = function () {
        //$location.url("/posts/create");
        $state.go('posts.create');
    };

    $scope.loadHomePage = function () {
        $location.url("/home");
    };
});