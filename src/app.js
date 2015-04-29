import angular from 'angular';
import {PatientService} from './patients/patients-service';
import angularRoute from 'angular-route';

/**
 * Application entry point. The name 'app' corresponds to the
 * ng-app="app" line in index.html
 */
angular.module('app', [angularRoute])
  /**
   * Configure Angular with the following routes
   */
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when('/', {
        templateUrl: 'home/templates/home.html',
        controller: function($scope){
          // Here goes controller code for the home page
        }
      })
      .when('/patients', {
        templateUrl: 'patients/templates/patients.html',
        controller: function($scope, PatientService){
          /**
           * Get all patients and bind them to the $scope
           * to make them visible in the html template
           */
          PatientService
            .get()
            .then(patients =>
              $scope.patients = patients);
        }
      })
      .when('/patients/:id', {
        templateUrl: 'patients/templates/patient-detail.html',
        controller: function($scope, $routeParams, PatientService){

          /**
           * Get a specific patient and bind it to the $scope
           */
          PatientService
            .get($routeParams.id)
            .then(patient =>
              $scope.patient = patient[0]);
        }
      })
    /**
     * If the used navigates to anything else than the routes
     * provided above, send the user to this route (which is just for show)
     */
      .otherwise({
        redirectTo: '/something-else'
      })
  }])

  .factory('PatientService', PatientService.factory)
  .controller('HomeCtrl', HomeCtrl);


function HomeCtrl($scope){
  console.log('home!');
}

