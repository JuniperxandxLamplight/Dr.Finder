export class LocationSearch{
  getLocation(location){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.exports.geocodeKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else{
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

export class DoctorSearch{
  getDoctor(location, type, search) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${location}&${type}=${search}&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
