(function (window, angular, undefined) {

  "use strict";

  function EventController($scope) {}

  angular.module("app")
    .controller("EventController", ["$scope", EventController]);

})(window, window.angular);