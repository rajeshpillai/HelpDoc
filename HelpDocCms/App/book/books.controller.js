angular.module("book.module").controller('books.controller',
    function ($scope, $anchorScroll, $location, $routeParams, $cookies, $locale, books, BookFactory, AuthSessionService, RatingService) {
    /*
     * NOTES:  books is injected from 'route resolve'
     */
    $scope.message = "Welcome to the Book Review app!";
   // $scope.myDateFormat = $locale.DATETIME_FORMATS.fullDate;

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

    // get all books from service: replaced this in route resolve
    //BookFactory.getAll().success(function (data) {
    //    $scope.books = data;
    //});

    $scope.books = books.data;

    BookFactory.genres().success(function (data) {
        $scope.genres = data;
    });

   // filter method
    $scope.filterByBookOrAuthor = function (book) {
        if ($.trim($scope.search) == '') {
            return true;
        }
        return (book.bookName.toLowerCase().startsWith($scope.search.toLowerCase()))
            || (book.author.toLowerCase().startsWith($scope.search.toLowerCase()));
    }

    // custom sort function
    $scope.sortFn = function (book) {
        if ($scope.sortOn == "publishedOn") {
            $scope.orderBy = 'publishedOn';
            return "-publishedOn";
        } else if ($scope.sortOn == "reviewCount") {
            $scope.orderBy = 'reviews.length';
            return -book.reviews.length;
        }
    }
    
    // enable add form
    $scope.toggleAdd = function (book) {
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

    // show book
    $scope.showBook = function (book) {
        $scope.currentBook = book;
    };

    $scope.closeAlert = function (index) {
        $scope.showAlert = false;
    };


    // voting
    // todo: get user name from where
    $scope.upVoteBook = function (book) {
        book.rating++;
        RatingService.upVote(book.id, "admin");
    }

    $scope.downVoteBook = function (book) {
        book.rating--;
        RatingService.downVote(book.id, "admin");
    }

    $scope.gotoAnchor = function (x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash('anchor' + x);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };
});