const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Rushabh'
    })
})

app.get('/about', (req,res) => {
    res.render('About',{
        title : 'About me ',
        name : 'Rushabh'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{

        helpText : 'This is help',
        title : 'Help',
        name : 'Rushabh'
       
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,location}={})=> {
        if (error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                Forecast : forecastData,
                address:req.query.address
            })
            
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
        
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Rushabh',
        errorMsg:'Help article not found ! '
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Rushabh',
        errorMsg:'Page not found ! '
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
