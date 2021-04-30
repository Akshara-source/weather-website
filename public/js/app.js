// const { response } = require("express");

const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
weather.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading.......'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'weather information of location ' + data.address +':'+data.forecast.weather_description+'.observed at '+data.forecast.observation_time;
            }
        })
    })

});