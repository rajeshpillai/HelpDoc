angular.module("book.module",
    ['ngRoute',
     'ngSanitize',
     'ngResource',
     'ngAnimate',
     'ngCookies'
    ]
);


angular.module("book.module").config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when("/home/:genre?", {
        templateUrl: "index.html",
        controller: "books.controller",
        resolve: {
            books: function ($route, BookFactory) {
                var genre = $route.current.params.genre;
                if (genre == undefined) {
                    return BookFactory.getAll();
                }
                else {
                    return BookFactory.getByGenre(genre);
                }
                
            }
        }
    })
    .when("/auth/login", {
        templateUrl: "app/auth/views/login.html",
        controller: "auth.controller",
    })
    .when("/books/create", {
        templateUrl: "app/book/views/createbook.html",
        controller: "book.controller"
    })
    .when("/books/show/:id", {
        templateUrl: "app/book/views/show.html",
        controller: "book.controller"
    })
    .when("/books/review/:id", {
        templateUrl: "app/book/views/reviews.html",
        controller: "reviews.controller"
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AuthInterceptor');

});

angular.module("book.module").config(function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});


angular.module("book.module").config(function ($provide) {
    $provide.decorator("$exceptionHandler",
        ["$delegate",
            function ($delegate) {
                return function (exception, cause) {
                    exception.message = "Please contact the support! \n Message: " +
                        exception.message;
                    $delegate(exception, cause);

                    alert(exception.message);

                    // log the exception on the server using $http
                }
            }
        ]
        );
});

angular.module("book.module").run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});