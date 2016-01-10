(function (window, angular, undefined) {

  "use strict";

  function CoupleRouterConfig($stateProvider) {
    $stateProvider.state("app.couple", {
      url: "/couple",
      templateUrl: "/static/couple/views/couple/couple.html",
      controller: "CoupleController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", CoupleRouterConfig]);

})(window, window.angular);