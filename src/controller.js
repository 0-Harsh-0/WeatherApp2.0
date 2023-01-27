//Importing the modules
const requests = require('requests');

const currentDay_Date = ()=>{
    //creating instance of date
    const date = new Date()

    //creating array of days
    const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    //getting day
    const current_day = days[date.getDay()]

    //creating array of date
    const dateArray = date.toDateString().split(' ')

    //getting date
    const current_date = `${dateArray[2]} ${dateArray[1]}`

    // returning the object
    return {day:current_day,date:current_date}
}

//calling the function
const dateObj = currentDay_Date()


//object of image names
const imageNames = {
    'Clouds': 'cloudy.png',
    'Rain': 'rain.png',
    'Clear': 'sun.png',
    'Mist': 'mist.png',
    'Smoke': 'smoke.png',
    'Haze': 'haze.png',
    'Dust': 'dust.png',
    'Fog': 'fog.png',
    'Sand': 'sand.png',
    'Ash': 'ash.png',
    'Squall': 'windstorm.png',
    'Tornado': 'tornado.png',
    'Snow': 'snow.png',
    'Drizzle': 'drizzle.png',
    'Thunderstorm': 'thunderstorm.png',
}

let error = '';


const getWeatherInfo = (cityName,res)=>{
    if(cityName === undefined){
        res.render('weather', { city: 'Get Output Here', hideClass: 'data_hide', date: dateObj, weather: 'active' })
    }
    else if (cityName === '') {
        error = 'Please Enter Valid City Name'
        res.render('weather', { city: error, hideClass: 'data_hide', date: dateObj, weather: 'active' })
    }
    else {
        let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cc176e73b0fc01aad0f8acb85855a04c&units=metric`
    
        requests(apiLink).on('data', (chunkData) => {
            let data = JSON.parse(chunkData)
            if (data.cod === '404') {
                error = 'Please Enter Valid City Name'
                res.render('weather', { city: error, hideClass: 'data_hide', date: dateObj, weather: 'active' })
            }
            else {
                const city = `${data.name}, ${data.sys.country}`
                const temperature = data.main.temp
                const weathter_status = data.weather[0].main
                const tempStatusIcon = `images/${imageNames[weathter_status]}`
                res.render('weather', {
                    city: city,
                    temp: temperature,
                    icon: tempStatusIcon,
                    hideClass: '',
                    date: dateObj,
                    weather: 'active'
                })
            }
        }).on('end', function (err) {
            if (err) {
                res.render('weather', { city: error, hideClass: 'data_hide', date: dateObj, weather: 'active' })
            }
        }).on('error', (err) => {
            if (err) {
                error = 'Please Enter Valid City Name'
                res.render('weather', { city: error, hideClass: 'data_hide', date: dateObj, weather: 'active' })
            }
        });
        
    }
}

module.exports = getWeatherInfo