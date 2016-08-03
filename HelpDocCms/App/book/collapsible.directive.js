'use strict';

/* todo: directive with transculusion */
angular.module("book.module").directive("collapsible", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: "<div><h4 class='well-title' title='click to collapse/expand' ng-click='toggleVisibility()'>{{title}}</h4><div ng-show='visible' ng-transclude></div> </div>",
        scope: {
            title: "@"
        },
        controller: function ($scope) {
            $scope.visible = true;

            $scope.toggleVisibility = function () {
                $scope.visible = !$scope.visible;
            }
        }
    };
});