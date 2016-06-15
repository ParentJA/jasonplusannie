(function (window, angular, undefined) {

  "use strict";

  function rsvpService($http, $q, BASE_URL) {
    return function (data) {
      var deferred = $q.defer();

      $http.post(BASE_URL + "rsvp/rsvp/", data).then(function (response) {
        deferred.resolve(response.data);
      }, function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .service("rsvpService", ["$http", "$q", "BASE_URL", rsvpService]);

})(window, window.angular);