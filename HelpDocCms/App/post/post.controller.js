﻿angular.module("post.module").controller('post.controller', function ($scope, $route, $location, $routeParams, $stateParams, $state,  PostFactory) {
    $scope.message = "Post details";

    // todo: ngRoute has to be replaced with ui-router

    var id = $stateParams.id || $routeParams.id;

    
    PostFactory.getById(id).success(function (data) {
        $scope.post = data;
    });

    // addnew post
    $scope.update = function () {
        var post = this.post;
        PostFactory.create(this.post).success(function (id) {
            post.id = id;
            //$location.url("/home");
            $state.go('posts');
        });
    };
});