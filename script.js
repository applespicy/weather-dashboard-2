const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1= document.getElementById('current-weather-items');
const timezone =document.getElementById('time-zone');
const weatherForcastE1 =document.getElementById('weather-forcast');
const currentTempE1= document.getElementById('current-temp');
let humdityE1=document.getElementById('hum');

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

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lan}&lon=${long}&exclude=hourly&minutely&units=metrics&appid=${API_KEY}`)
        .then(res=>res.json()).then(data=>{
            console.log(data)
            showWeatherData(data);
        })
       
    })
}
getWeatherData()
function showWeatherData(data){
    let {humidity, pressure, wind_speed} = data.current;
    timezone.innerHTML=data.timezone,
    
    currentWeatherItemsE1.innerHTML =
                `<div class="weather-items">
                    <div>humidity</div>
                    <div>${humidity}</div>
                </div>
                <div class="weather-items">
                    <div>pressure</div>
                    <div>${pressure}</div>
                </div>
                <div class="weather-items">
                    <div>windspeed</div>
                    <div>${wind_speed}</div>
                </div>`

        let otherDayForcast=''
        data.daily.forEach((day, idx) => {
            if (idx ==0){
                currentTempE1.innerHTMl= `<div class="weather-forcast-items">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="day">${moment(day.dt*1000).format(`ddd`)}</div>
            <div class="temp">${day.temp.night}&#176;c</div>
            <div class="temp">${day.temp.day}&#176;c</div>
            </div>`
            }else{
                otherDayForcast +=
               `<div class="weather-forcast-items">
               <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
           <div class="day">${moment(day.dt*1000).format(`ddd`)}</div>
           <div class="temp">Night ${day.temp.night}&#176;c</div>
           <div class="temp">Day ${day.temp.day}&#176;c</div>
           </div>` 
                
            }
        } )   
      
        weatherForcastE1.innerHTML =otherDayForcast;
    }
