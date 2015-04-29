var express = require('express'),
    cors = require('express-cors'),
    app = express(),
    faker = require('faker'),
    _ = require('lodash');

function generatePatients(nofPatients){
  return _.map(_.range(1, nofPatients+1), function (i) {
    return {
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.avatar(),
      address: {
        streetAddress: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city(),
      }
    };
  });
}

patients = generatePatients(10);

app.use(cors({
  allowedOrigins: ['localhost:*']
}));

app.get('/patients', function(req, res) {
  res.send(patients);
});

app.get('/patients/:id([0-9+])', function (req, res) {
  console.log(req.headers);
  res.send(_.filter(patients, function(patient){
    return patient.id.toString() === req.params.id;
  }))
});

app.put('/patients/:id([0-9+])', function (req, res) {
  console.log('GOT PUT', res.body);
  patient = _.filter(patients, function(patient){
    return patient.id.toString() === req.params.id;
  })[0];

  // echo
  res.sendStatus(200);

});

var server = app.listen(3000, function() {
  console.log('Express is listening to http://localhost:3000');
});
