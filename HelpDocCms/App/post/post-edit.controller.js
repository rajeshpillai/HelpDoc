angular.module("post.module").controller('post-edit.controller', function ($scope, $route, $location, $stateParams, $state,  PostFactory) {
    $scope.message = "Post details";

    // todo: ngRoute has to be replaced with ui-router

    var id = $stateParams.id;

    
    PostFactory.getById(id).success(function (data) {
        $scope.post = data;
    });

    // addnew post
    $scope.update = function () {
        var post = this.post;
        PostFactory.update(this.post).success(function (id) {
            post.id = id;
            $state.go('posts');
        });
    };
});