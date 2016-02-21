(function (window, angular, undefined) {

  "use strict";

  function RegistryRouterConfig($stateProvider) {
    $stateProvider.state("app.registry", {
      url: "/registry",
      templateUrl: "/static/registry/views/registry/registry.html",
      controller: "RegistryController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", RegistryRouterConfig]);

})(window, window.angular);