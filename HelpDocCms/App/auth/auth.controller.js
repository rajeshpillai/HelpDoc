angular.module("post.module").controller('auth.controller', function ($scope, $rootScope, $cookies, $location, AuthService, AuthSessionService) {
    $scope.message = "Welcome to the HdlpDoc CMS app!";

    init();

    function init() {
    }

    $rootScope.showLogout = AuthSessionService.isUserLoggedin();
    $rootScope.username = AuthSessionService.getUser();
    if ($rootScope.showLogout) {
        $location.path("/");
    }
   // AuthSessionService.deleteToken();

    $scope.login = function (username, password) {
        AuthService.doLogin(username, password).success(function (data) {
            console.log("on Login Token- ", data);
            AuthSessionService.setToken(data);
            AuthSessionService.setUser(username);
            $rootScope.showLogout = true;
            $rootScope.username = username;
            $location.path("/");
        });
    }

    $scope.logout = function () {
        AuthSessionService.deleteToken();
        $rootScope.showLogout =false;
        $rootScope.username = "";
        $location.path("/auth/login");
    }

});