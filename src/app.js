const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');
const port = process.env.PORT || 3000;



const app = express();
const hbs = require('hbs');
const publicDirectoryPath = path.join(__dirname, '../public')
//define path for express config
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//set handle bar engins and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application',
        name: 'akshara',

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'akshara',

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather application title',
        name: 'akshara',

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("provide address");
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return console.log('unnable to connect');
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return console.log('information not found');
            }
            const {observation_time,weather_description} = forcastData;
            return res.send({
                forecast: forcastData,
                address: req.query.address
            })


            // return res.send('weather information of location ' + location +':'+weather_description+'.observed at '+observation_time);
         });
    
    
    });

});
app.get('/about/*',(req,res)=>{
    res.render('error',{
        title : "error",
        message : "about page is not found"
    });
})

app.get('/products',(req,res)=>{
    if(!req.query.address){
        return res.send("please input address");

    }
    return res.send({
        'input':req.query
    });

});

app.get('/*',(req,res)=>{
    res.render('error',{
        title : "error",
        message : "page not found"
    });
})


app.listen(port,()=>{
    console.log("listen to "+port);

});