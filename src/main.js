import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {DoctorSearch, LocationSearch} from './api.js';
import {concatLocation} from './backEnd.js';

$(function(){
  const locationApi = new LocationSearch;
  const doctorApi = new DoctorSearch;

  $(".search").submit(function(event){
    event.preventDefault();
    $('.results').empty();
    $('.error').empty();

    const distance = $('.distance').val();
    const location = concatLocation($('.location').val());
    const searchType = $('.selection').val();
    const searchParameters = $(".searchTerm").val();

    const getGeocode = locationApi.getLocation(location);
    getGeocode.then(function(response) {
      let body = JSON.parse(response);
      const geocode = `${body.results[0].geometry.location.lat},${body.results[0].geometry.location.lng},${distance}`;

      const getDoctors = doctorApi.getDoctor(geocode, searchType, searchParameters);

      getDoctors.then(function(response) {
        let body = JSON.parse(response);
        console.log(body);
        console.log(body.data);
        if (body.data.length === 0){
          $(".error").append("<p>Oops! Looks like nothing fits this criteria. Please try again.</p>")
        } else{
          for(let i=0; i<body.meta.count; i++){
            $('.results').append(`<div class="result">
            <img src="${body.data[i].profile.image_url}" alt="picture of doctor">
            <div>
            <p>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</p>
            <p>${body.data[i].practices[0].visit_address.street}<br>${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}, ${body.data[i].practices[0].visit_address.zip}</p>
            <p>${body.data[i].practices[0].phones[0].number}</p>
            <a href="${body.data[i].practices[0].website}">Visit Website</a>
            <p>Currently Accepting Patients: ${body.data[i].practices[0].accepts_new_patients}</p>
            </div>
            </div>`)
          }
        }
      }, function(error) {
        $('.error').append(`<p>There was an error processing your request: invalid search term</p>`);
      });
    }, function(error) {
      $('.error').append(`<p>There was an error processing your request: invalid location</p>`);
      console.log(error);
    });

  });
});
