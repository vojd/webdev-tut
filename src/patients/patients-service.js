'use strict';

class PatientService {
  constructor($http){
    this.$http = $http;
  }

  /**
   * Get a list of patients or if given an id
   * a list of one patient
   * Uses the HTTP GET method
   * @param id
   * @returns {*}
   */
  get(id){
    var urlParam = '';
    if(id){
      urlParam = '/'+id;
    }
    return this.$http
      .get('http://localhost:3000/patients'+urlParam)
      .then(result => result.data);
  }

  /**
   * Update a patient using the HTTP PUT method
   * @param data
   * @returns {*}
   */
  save(data){
    console.log('saving', data);
    var id = data.id;
    return this.$http
      .put('http://localhost:3000/patients/'+id, data)
      .then(r => r.data);
  }

  static factory($http){
    return new PatientService($http);
  }
}

/**
 * Tell angular that we want to use the $http module
 * so that we can interact with an HTTP server
 * @type {string[]}
 */
PatientService.factory.$inject = ['$http'];
export { PatientService }