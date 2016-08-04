angular.module("post.module").controller('posts.controller',
    function ($scope, $anchorScroll, $location, $routeParams, $stateParams, $cookies, $locale, PostFactory, AuthSessionService) {
    /*
     * NOTES:  posts is injected from 'route resolve'
     */
    $scope.message = "Welcome to the HelpDoc";
    $scope.orderBy = 'publishedOn';
    $scope.reverse = true;
    $scope.showNotification = false;


    $scope.filterTag = $stateParams.tag || $routeParams.tag;

    $scope.notifySuccess = function (msg) {
        $scope.notificationMessage = msg;
        $scope.showNotification = true;
    };

    init();

    function init() {
        $scope.layout = $cookies.get('myLayout');
        $scope.sortOn = $cookies.get('mySort');
    }

    var tag = $stateParams.tag;
    if (tag === undefined || tag === null || tag.trim() == '') {
        PostFactory.getAll().success(function (data) {
            $scope.posts = data;
        });
    }
    else {
        PostFactory.getByTag(tag).success(function (data) {
            $scope.posts = data;
        })
    }

    
    PostFactory.tags().success(function (data) {
        $scope.tags = data;
    });

   
    // custom sort function
    $scope.sortFn = function (post) {
        if ($scope.sortOn == "publishedOn") {
            $scope.orderBy = 'publishedOn';
            return "-publishedOn";
        } else if ($scope.sortOn == "sectionCount") {
            $scope.orderBy = 'sections.length';
            return -post.sections.length;
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

    $scope.delete = function (post) {
         var result = confirm("You are about to delete document " + post.title + ".  Are you sure?");
        if (result === true) {
            PostFactory.remove(post.id);
        }
    }
});