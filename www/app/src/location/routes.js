(function (window, angular, undefined) {

  "use strict";

  function LocationRouterConfig($stateProvider) {
    $stateProvider.state("app.location", {
      url: "/location",
      templateUrl: "/static/location/views/location/location.html",
      controller: "LocationController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", LocationRouterConfig]);

})(window, window.angular);