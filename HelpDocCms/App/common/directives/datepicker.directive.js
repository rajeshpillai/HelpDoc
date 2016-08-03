'use strict';

angular.module("book.module").directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.datepicker();
        }
    }
});
