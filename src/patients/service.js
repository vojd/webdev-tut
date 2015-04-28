'use strict';

class PatientService {
  constructor($http){
    this.$http = $http;
  }

  getPatients(){
    return this.$http
      .get('http://localhost:3000/patients')
      .then(r => r.data);
  }

  static factory($http){
    return new PatientService($http);
  }
}

PatientService.factory.$inject = ['$http'];
export { PatientService }