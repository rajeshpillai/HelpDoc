angular.module("post.module",
    ['ngRoute',
     'ngSanitize',
     'ngResource',
     'ngAnimate',
     'ngCookies'
    ]
);


angular.module("post.module").config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when("/home/:tag?", {
        templateUrl: "index.html",
        controller: "posts.controller",
        resolve: {
            posts: function ($route, PostFactory) {
                var tag = $route.current.params.tag;
                if (tag == undefined) {
                    return PostFactory.getAll();
                }
                else {
                    return PostFactory.getByTag(tag);
                }
                
            }
        }
    })
    .when("/auth/login", {
        templateUrl: "app/auth/views/login.html",
        controller: "auth.controller",
    })
    .when("/posts/create", {
        templateUrl: "app/post/views/createpost.html",
        controller: "post.controller"
    })
    .when("/posts/show/:id", {
        templateUrl: "app/post/views/show.html",
        controller: "post.controller"
    })
    .when("/posts/section/:id", {
        templateUrl: "app/post/views/sections.html",
        controller: "sections.controller"
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AuthInterceptor');

});

angular.module("post.module").config(function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});


angular.module("post.module").config(function ($provide) {
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

angular.module("post.module").run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});