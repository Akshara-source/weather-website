const request = require('request');

const forcast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=43ce31e9a98eb3593c673e477fa0d306&query='+latitude+','+longitude+'';
       request({
           url,
           json:true
       },(error,{body})=>{
           if(error){
               callback("unnable to connect",undefined);

           }else if(body.error){
               callback("unnable to find data.try another search",undefined);
           }else{
               callback(undefined,{
                   weather_description : body.current.weather_descriptions,
                   observation_time : body.current.observation_time,

               });
           }
       })

};
module.exports = forcast;
