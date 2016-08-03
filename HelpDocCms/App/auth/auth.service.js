angular.module("book.module").factory("AuthService", function ($http, LoginConfig) {
    
    return {
        doLogin: function (username, password) {
            var User = {
                Username: username,
                Password: password
            }
            return $http.post(LoginConfig.apiUrl + "/token", User);
        }
    }
});