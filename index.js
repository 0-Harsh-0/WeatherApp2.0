//importing required modules
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getWeatherInfo = require('./src/controller');

//port 
const port = process.env.PORT || 8000

//creating express app
const app = express()

//getting the paths
// public Folder Path
const staticFilesPath = path.join(__dirname,'./public')
// View Folder Path
const viewsPath = path.join(__dirname,'./templates/views')
// Partials Folder Path
const partialsPath = path.join(__dirname,'./templates/partials')



// setting the view engine and views directory
app.set('view engine','hbs')
app.set('views',viewsPath)

//registering the partials
hbs.registerPartials(partialsPath)

//using the static method for serving static files
app.use(express.static(staticFilesPath))


// ------------------------------------------- //
//routing

//home
app.get('/',(req,res)=>{
    res.render("index",{home: 'active'})
})

//about
app.get('/about',(req,res)=>{
    res.render("about", { about: 'active' })
})

//weather
app.get('/weather',(req,res)=>{
    getWeatherInfo(req.query.city_name,res)
})

//for any other endpoint which is not the mentioned above
app.get('*',(req,res)=>{
    res.render('404')
})

// ------------------------------------------- //

//listening the app
app.listen(port,()=>{
    console.log(`Listening on port '${port}'`);
})


