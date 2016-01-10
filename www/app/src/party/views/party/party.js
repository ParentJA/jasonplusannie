(function (window, angular, undefined) {

  "use strict";

  function PartyController($scope) {}

  angular.module("app")
    .controller("PartyController", ["$scope", PartyController]);

})(window, window.angular);