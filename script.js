const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1= document.getElementById('current-weather-items');
const timezone =document.getElementById('time-zone');
const weatherForcastE1 =document.getElementById('weather-forcast');
const currentTempE1= document.getElementById('current-temp');

const days=['sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Sep','Oct','Nov','Dec'];

const API_KEY = '4fbead2db5750721bd6993c25a31e9df';

setInterval(()=>{
const time = new Date();
const date =time.getDate();
const month = time.getMonth();
const day = time.getDay();
const hour =time.getHours();
const hourIn12HrFormat= hour >= 12 ? hour %12: hour
const minutes = time.getMinutes();
const ampm = hour >=12 ? 'PM' :  'AM'

timeE1.innerHTML=  hourIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
dateE1.innerHTML= days[day] + ',' + date+ ' '+ months[month]
}, 1000);

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let long = success.coords.longitude
        let lan =success.coords.latitude

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lan}&lon=${long}&exclude=hourly&minutely&appid=${API_KEY}`)
        .then(res=>res.json()).then(data=>{
            console.log(data)
        })
    })
}
getWeatherData()
