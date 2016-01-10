(function (window, angular, undefined) {

  "use strict";

  function PartyRouterConfig($stateProvider) {
    $stateProvider.state("app.party", {
      url: "/party",
      templateUrl: "/static/party/views/party/party.html",
      controller: "PartyController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", PartyRouterConfig]);

})(window, window.angular);