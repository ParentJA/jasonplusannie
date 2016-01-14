(function (window, angular, undefined) {

  "use strict";

  function CityRouterConfig($stateProvider) {
    $stateProvider.state("app.city", {
      url: "/city",
      templateUrl: "/static/city/views/city/city.html",
      controller: "CityController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", CityRouterConfig]);

})(window, window.angular);