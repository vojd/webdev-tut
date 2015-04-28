import angular from 'angular';
import {PatientService} from './patients/service'

angular.module('app', [require('angular-route')])
  .config(['$routeProvider', function($routeProvider){
    console.log('running route ', $routeProvider);

    $routeProvider
      .when('/patients', {
        templateUrl: 'patients/templates/patients.html',
        controller: function($scope, PatientService){
          console.log('running', $scope, PatientService);
          PatientService
            .getPatients()
            .then(patients =>
              $scope.patients = patients);
        }
      })
      .when('/patients/:id', {
        templateUrl: 'patients/templates/patient-detail.html',
        controller: function($scope, $routeParams, PatientService){
          console.log('patient id', $routeParams);
        }
      })
      .otherwise({
        redirectTo: '/something-else'
      })
  }])

  .factory('PatientService', PatientService.factory);

