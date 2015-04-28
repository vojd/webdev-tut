var express = require('express'),
    cors = require('express-cors'),
    app = express(),
    faker = require('faker'),
    _ = require('lodash');

function generatePatients(nofPatients){
  return _.map(_.range(nofPatients), function (i) {
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



var server = app.listen(3000, function() {
  console.log('Express is listening to http://localhost:3000');
});
