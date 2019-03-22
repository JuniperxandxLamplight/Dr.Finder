import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DoctorSearch} from './api.js';

$(function(){
  const apiCall = new DoctorSearch;

  $(".search").submit(function(event){
    event.preventDefault();

    let searchParameters = $(".input1").val();

    const getDoctors = apiCall.getDoctor(searchParameters);

    getDoctors.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
