(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($locationProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider) {
    $stateProvider
      .state("app", {
        url: "/app",
        template: "<div ui-view autoscroll='true'></div>",
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");

    $uiViewScrollProvider.useAnchorScroll();
  }

  function UiRunner($anchorScroll, $location, $rootScope, $state, navigationService) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function () {
      // Close navigation menu on mobile.
      navigationService.closeNavigation();

      // Scroll to the top of the page.
      if ($state.params.scrollTo) {
        $location.hash($stateParams.scrollTo);
        $anchorScroll();
      }
    });
  }

  function MainController($scope, $uibModal, navigationService, rsvpService) {
    $scope.navigationService = navigationService;

    $scope.openRsvp = function openRsvp() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "/static/rsvp/views/rsvp/rsvp.html",
        controller: "RsvpController"
      });

      modalInstance.result.then(submitRsvp);
    };

    function submitRsvp(data) {
      rsvpService(data);
    }
  }

  angular.module("app", ["ngAnimate", "ngCookies", "ngSanitize", "ui.bootstrap", "ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$locationProvider", "$stateProvider", "$urlRouterProvider", "$uiViewScrollProvider", UiRouterConfig])
    .run(["$anchorScroll", "$location", "$rootScope", "$state", "navigationService", UiRunner])
    .controller("MainController", ["$scope", "$uibModal", "navigationService", "rsvpService", MainController]);

})(window, window.angular);