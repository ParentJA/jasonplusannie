(function (window, angular, undefined) {

  "use strict";

  function RsvpController($scope, $uibModalInstance) {
    $scope.models = {
      name: null,
      is_attending: true,
      num_attending: 0,
      num_steak: 0,
      num_fish: 0,
      num_vegetarian: 0,
      num_children: 0,
      is_brunch: true
    };

    $scope.rsvp = null;

    $scope.ok = function ok() {
      $uibModalInstance.close($scope.models);
    };

    $scope.cancel = function cancel() {
      $uibModalInstance.dismiss("cancel");
    };
  }

  angular.module("app")
    .controller("RsvpController", ["$scope", "$uibModalInstance", RsvpController]);

})(window, window.angular);