const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGFyYXMzMTQiLCJhIjoiY2tiOTN4dmdlMGFkODJxbzQwNjFiNDJ1YSJ9._EHqKBROcw0JBhK4FemAlQ&limit=1';
    request({url,json : true},(error,{body})=>{
        if(error){
            callback('unnable to connect',undefined)
        }else if(body.features.lenght === 0){
            callback('unnable to find location.please try another search!',undefined);
        }else{
           callback(undefined,{
               
                longitude :body.features[0].center[0],
                latitude :body.features[0].center[1],
               location :body.features[0].place_name
           }); 
        }
    });
    };
    module.exports = geocode;
