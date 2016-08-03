angular.module("post.module").controller('post.controller', function ($scope, $route, $location, $routeParams,  PostFactory) {
    $scope.message = "Post details";

    var id = $routeParams.id;


    PostFactory.getById(id).success(function (data) {
        $scope.post = data;
    });

    // addnew post
    $scope.update = function () {
        var post = this.post;
        PostFactory.update(this.post).success(function (id) {
            post.id = id;
            $location.url("/home");
        });
    };
});