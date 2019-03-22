import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DoctorSearch} from './api.js';

$(function(){
  const apiCall = new DoctorSearch;

  $(".search").submit(function(event){
    event.preventDefault();

    $('.results').empty();

    const searchType = $('.selection').val();
    const searchParameters = $(".input1").val();

    const getDoctors = apiCall.getDoctor(searchType, searchParameters);

    getDoctors.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
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
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
