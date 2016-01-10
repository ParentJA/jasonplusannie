(function (window, angular, undefined) {

  "use strict";

  function EventRouterConfig($stateProvider) {
    $stateProvider.state("app.event", {
      url: "/event",
      templateUrl: "/static/event/views/event/event.html",
      controller: "EventController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", EventRouterConfig]);

})(window, window.angular);