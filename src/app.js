const express=require('express')
const { dirname } = require('path')
const path=require('path')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express()

// define path for express congi

const pathtoPubicDirctory=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialpath=path.join(__dirname,'../template/partials')

//setup for static directiory to serve
app.use(express.static(pathtoPubicDirctory))
hbs.registerPartials(partialpath)
//setup for handlebars and views location
app.set('view engine','hbs')
app.set('views',viewspath)
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Shivraj Menkale'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must have to provide address'
        })
    }
    geocode(req.query.address,(error,{lat ,long,location}={})=>{   //setup a default parameter remaining
        if(error){
            return res.send(error)
        }
        forecast(lat,long,(error,forecastdata)=>{
            if(error){
                return res.send(error)
            }
            res.send({
               Forecastdata: "The temprature of " + location+" is "+forecastdata +" degree"
            })
        })
    })
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Shivraj Menkale'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about Me',
        name:'Shivraj Menkale'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log(' server is live on port 3000')
})
