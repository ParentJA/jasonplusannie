(function (window, angular, undefined) {

  "use strict";

  function PartyRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("app.party", {
        url: "/party",
        templateUrl: "/static/party/views/party/party.html",
        controller: "PartyController"
      })
      .state("app.party.bridesmaids", {
        url: "/bridesmaids",
        templateUrl: "/static/party/views/bridesmaids/bridesmaids.html",
        controller: "BridesmaidsController"
      })
      .state("app.party.groomsmen", {
        url: "/groomsmen",
        templateUrl: "/static/party/views/groomsmen/groomsmen.html",
        controller: "GroomsmenController"
      });
  }

  angular.module("app")
    .config(["$stateProvider", PartyRouterConfig]);

})(window, window.angular);