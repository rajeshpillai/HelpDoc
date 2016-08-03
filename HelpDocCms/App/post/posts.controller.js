angular.module("post.module").controller('posts.controller',
    function ($scope, $anchorScroll, $location, $routeParams, $cookies, $locale, posts, PostFactory, AuthSessionService, RatingService) {
    /*
     * NOTES:  posts is injected from 'route resolve'
     */
    $scope.message = "Welcome to the HelpDoc";

    $scope.orderBy = 'publishedOn';
    $scope.reverse = true;
    $scope.showNotification = false;


    $scope.filterGenre = $routeParams.genre;

    $scope.notifySuccess = function (msg) {
        $scope.notificationMessage = msg;
        $scope.showNotification = true;
    };



    init();

    function init() {
        $scope.layout = $cookies.get('myLayout');
        $scope.sortOn = $cookies.get('mySort');
    }

    $scope.posts = posts.data;

    PostFactory.genres().success(function (data) {
        $scope.genres = data;
    });

   // filter method
    $scope.filterByBookOrAuthor = function (post) {
        if ($.trim($scope.search) == '') {
            return true;
        }
        return (post.postName.toLowerCase().startsWith($scope.search.toLowerCase()))
            || (post.author.toLowerCase().startsWith($scope.search.toLowerCase()));
    }

    // custom sort function
    $scope.sortFn = function (post) {
        if ($scope.sortOn == "publishedOn") {
            $scope.orderBy = 'publishedOn';
            return "-publishedOn";
        } else if ($scope.sortOn == "reviewCount") {
            $scope.orderBy = 'reviews.length';
            return -post.reviews.length;
        }
    }
    
    // enable add form
    $scope.toggleAdd = function (post) {
        if (AuthSessionService.isTokenExist()) {
            $scope.showAdd = !$scope.showAdd;
        }
        else {
            $location.path("/auth/login");
        }
    };

    // Radio button layout changes.
    $scope.layoutChange = function () {
        // Setting a cookie
        $scope.showAlert = true;
        //$scope.alertMessage = "Your new selection " + $scope.layout + ", has been saved!";

        $scope.notifySuccess("Your new selection " + $scope.layout + ", has been saved!");

        $cookies.put('myLayout', $scope.layout);
    }

    // Radio button layout changes.
    $scope.sortChange = function () {
        // Setting a cookie
        $scope.showAlert = true;
        $scope.alertMessage = "Your new sorting " + $scope.sortOn + ", has been saved!";
        $cookies.put('mySort', $scope.sortOn);
    }

    // show post
    $scope.showPost = function (post) {
        $scope.currentPost = post;
    };

    $scope.closeAlert = function (index) {
        $scope.showAlert = false;
    };


    // voting
    // todo: get user name from where
    $scope.upVote = function (post) {
        post.rating++;
        RatingService.upVote(post.id, "admin");
    }

    $scope.downVote = function (post) {
        post.rating--;
        RatingService.downVote(post.id, "admin");
    }

    $scope.gotoAnchor = function (x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
            $location.hash('anchor' + x);
        } else {
            $anchorScroll();
        }
    };
});