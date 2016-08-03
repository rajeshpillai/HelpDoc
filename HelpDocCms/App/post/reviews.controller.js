angular.module("post.module").controller('reviews.controller',
   function ($scope, $route, $routeParams,$location, PostFactory, ReviewService, AuthSessionService) {
    $scope.review = {
        title: "",
        body: "",
        postId: ""
    };

    $scope.message = "Review details";

    $scope.review.postId = $routeParams.id;

    PostFactory.getReviewsById($scope.review.postId).success(function (data) {
        $scope.reviews = data;
    });

    $scope.reviewform = false;

    $scope.toggleAddReview = function () {
        if (AuthSessionService.isTokenExist()) {
            $scope.reviewform = !$scope.reviewform;
        }
        else {
            $location.path("/auth/login");
        }
    };

    $scope.addReview = function () {
        $scope.review.postId = $routeParams.id;
        ReviewService.save($scope.review, function (data) {
            $scope.review.id = data.id;
            $scope.review.username = data.username;
            $scope.reviews.push($scope.review);

            alert('Review saved!');

            $scope.clearForm();
        });

    };

    $scope.clearForm = function () {
        $scope.review = {
            title: "",
            body: "",
            postId: "",
            id: ""
        };
    }
});