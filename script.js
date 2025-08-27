let Cityname = document.getElementById("CityName");
let submit = document.getElementById("submit");
let error = document.querySelector(".error");

let today = document.querySelector(".day");
let daysforcast = [];
let dayfinder;

const apikey = "00e2fe8c9809a585f7e51dccf8818a42";


    const fetchweatherdata = async () =>{

    let city = Cityname.value.toLowerCase().trim();
    Cityname.blur();
    
    if(city === ""){
        error.style.display = "block";
    }else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
        let forcast_response = await fetch(forecasturl);
        let response = await fetch(url);
        let data = await forcast_response.json();
        let currentdata = await response.json();
        console.log(currentdata);
        console.log(data);
        
        cityinfo(currentdata);
        weather_icon(data);
        dayanddate();
        highlow(data);
    
    }
  }



 function highlow(data){
  let daychangeindices = [];
  for (let i = 1; i < data.list.length; i++) {
    let currentdate = new Date(data.list[i].dt * 1000).getDate();
    let previousdate = new Date(data.list[i - 1].dt * 1000).getDate();
    if (currentdate !== previousdate) {
      daychangeindices.push(i);
    }}
    console.log(daychangeindices);
    let maxTemps = [];
    let minTemps = [];
    let startIndex = 0;
    daychangeindices.push(data.list.length);
    for (let i = 0; i < daychangeindices.length; i++) {
      let endIndex = daychangeindices[i];
      let dailyTemps = data.list.slice(startIndex, endIndex).map(item => item.main.temp);
      let maxTemp = Math.max(...dailyTemps);
      let minTemp = Math.min(...dailyTemps);
      maxTemps.push(maxTemp);
      minTemps.push(minTemp);
      startIndex = endIndex;
    } 

    let max_temp = document.querySelector(".max_temp");
    let min_temp = document.querySelector(".min_temp");
    max_temp.textContent = `H: ${Math.round(maxTemps[0])}°C`;
    min_temp.textContent = `L: ${Math.round(minTemps[0])}°C`;

    let today_max_temp = document.querySelector(".today_max_temp");
    let today_min_temp = document.querySelector(".today_min_temp");
    today_max_temp.textContent =Math.round(maxTemps[0])
    today_min_temp.textContent = Math.round(minTemps[0])

    let tomorrow_max_temp = document.querySelector(".tomorrow_max_temp");
    let tomorrow_min_temp = document.querySelector(".tomorrow_min_temp");
    tomorrow_max_temp.textContent = Math.round(maxTemps[1]);
    tomorrow_min_temp.textContent = Math.round(minTemps[1]);

    let dayaftertomorrow_max_temp = document.querySelector(".dayaftertomorrow_max_temp");
    let dayaftertomorrow_min_temp = document.querySelector(".dayaftertomorrow_min_temp");
    dayaftertomorrow_max_temp.textContent = Math.round(maxTemps[2]);  
    dayaftertomorrow_min_temp.textContent = Math.round(minTemps[2]);

    let overmorrow_max_temp = document.querySelector(".overmorrow_max_temp");
    let overmorrow_min_temp = document.querySelector(".overmorrow_min_temp"); 
    overmorrow_max_temp.textContent = Math.round(maxTemps[3]);
    overmorrow_min_temp.textContent = Math.round(minTemps[3]);
 }

function weather_icon(data) {
  let today_weather_icon = document.querySelector(".today_weather_icon");
    let tomorrow_weather_icon = document.querySelector(".tomorrow_weather_icon");
    let dayaftertomorrow_weather_icon = document.querySelector(".dayaftertomorrow_weather_icon");
    let overmorrow_weather_icon = document.querySelector(".overmorrow_weather_icon");

    let forecastByDay = {};

    data.list.forEach((item ) => {
        let date = new Date(item.dt * 1000);
        let dateKey = date.toISOString().split("T")[0]; 
        forecastByDay[dateKey] = item;;

        
    });
    
    let forecastDays = Object.keys(forecastByDay).sort();
    let today_icon = forecastByDay[forecastDays[0]];
    let tomorrow_icon = forecastByDay[forecastDays[1]];
    let dayAfterTomorrow_icon = forecastByDay[forecastDays[2]];
    let overmorrow_icon = forecastByDay[forecastDays[3]];
    today_weather_icon.src = `https://openweathermap.org/img/wn/${today_icon.weather[0].icon}@2x.png`;
     
    if (tomorrow_icon) {
        tomorrow_weather_icon.src = `https://openweathermap.org/img/wn/${tomorrow_icon.weather[0].icon}@2x.png`;
    }
    if (dayAfterTomorrow_icon) {
        dayaftertomorrow_weather_icon.src = `https://openweathermap.org/img/wn/${dayAfterTomorrow_icon.weather[0].icon}@2x.png`;
    }
    if (overmorrow_icon) {
        overmorrow_weather_icon.src = `https://openweathermap.org/img/wn/${overmorrow_icon.weather[0].icon}@2x.png`;
    } 
    upcomingdays();
   
    }


function upcomingdays(){
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let today = new Date().getUTCDay();
    let Tomorrow = document.querySelector(".Tomorrow");
          Tomorrow.textContent = days[today === 7 ? 0 : today + 1]; 
    let dayaftertomorrow = document.querySelector(".dayaftertomorrow");
        dayaftertomorrow.textContent = days[Tomorrow.textContent === "Sat" ? 0 : today + 2]; 
    let Overmorrow = document.querySelector(".Overmorrow");
        Overmorrow.textContent = days[dayaftertomorrow.textContent === "Sat" ? 0 : today + 3]; 

}
 
function dayanddate(){
    today.textContent = `Day: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`;
   
 }
 
 function cityinfo(currentdata){
  let temperature = document.querySelector(".temperature");
  let humidity = document.querySelector(".humidity");
  let WindSpead = document.querySelector(".WindSpead");
  let rainspeed = document.querySelector(".RainSpeed");
  let weather = document.querySelector(".weather");
  let today_description = document.querySelector(".today_description");
  let card_title = document.querySelector(".card-title");
  let tomorrow_description = document.querySelector(".tomorrow_description");
  let dayaftertomorrow_description = document.querySelector(".dayaftertomorrow_description");
  let overmorrow_description = document.querySelector(".overmorrow_description");

  today_description.classList.remove("d-none");
  tomorrow_description.classList.remove("d-none");
  dayaftertomorrow_description.classList.remove("d-none");
  overmorrow_description.classList.remove("d-none");

  today_description.classList.add("d-block");
  tomorrow_description.classList.add("d-block"); 
  dayaftertomorrow_description.classList.add("d-block");
  overmorrow_description.classList.add("d-block");

  card_title.textContent = currentdata.name;

  currentdata.weather[0].description = currentdata.weather[0].description.charAt(0).toUpperCase() + currentdata.weather[0].description.slice(1);
  weather.textContent = currentdata.weather[0].description;
  today_description.textContent = weather.textContent;



  temperature.innerHTML = `${Math.round(currentdata.main.temp)}°C`;
  humidity.innerHTML = ` <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                style="vertical-align: middle"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3.25C12 3.25 6.75 9.25 6.75 15a5.25 5.25 0 0 0 10.5 0c0-5.75-5.25-11.75-5.25-11.75z"
                />
              </svg> ${currentdata.main.humidity}%`;
  WindSpead.innerHTML = `<i
                class="fas fa-leaf"
                style="font-size: 16px; color: #bdbdbd"
              ></i>&nbsp; ${currentdata.wind.speed} m/s`;

  rainspeed.innerHTML = `<i
                class="fa-solid fa-cloud-rain"
                style="font-size: 14px; color: grey"
              ></i>&nbsp; ${currentdata.rain ? currentdata.rain["1h"] + " mm" : " 0mm"}`
 }


submit.addEventListener("click", fetchweatherdata);
Cityname.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      fetchweatherdata();
    }});

