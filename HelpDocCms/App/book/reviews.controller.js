angular.module("book.module").controller('reviews.controller',
   function ($scope, $route, $routeParams,$location, BookFactory, ReviewService, AuthSessionService) {
    $scope.review = {
        title: "",
        body: "",
        bookId: ""
    };

    $scope.message = "Review details";

    $scope.review.bookId = $routeParams.id;

    BookFactory.getReviewsById($scope.review.bookId).success(function (data) {
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
        $scope.review.bookId = $routeParams.id;
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
            bookId: "",
            id: ""
        };
    }
});