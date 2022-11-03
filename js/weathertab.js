
//Устанавливаем исходные данные о местоположении
var lat = 59.9386;
var lng = 30.3141;
var weatherTitle="Погода в Санкт-Петербурге"

//Получаем объекты DOM 
const weatherTitleDOM = document.querySelector(".notify.weather .text.subsubtitle");
const weatherTemperature = document.querySelector("#temperature");
const weatherImg = document.querySelector("#weatherImg");

//Устанавливаем погоду на основании исходных данных о местоположении
GetWeather(lat,lng,SetWeatherDOM);

//Запрашиваем местоположение и при разрешении устанавливаем фактическое местоположение
navigator.geolocation.getCurrentPosition(

    function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        weatherTitle="Погода за окном"

        GetWeather(lat,lng,SetWeatherDOM);//Устанавливаем погоду
    },
);

//Функция обнавляющая DOM
function SetWeatherDOM(weather)
{
    weatherTitleDOM.innerHTML=weatherTitle;
    weatherTemperature.innerHTML=weather.data[0].app_temp;
    weatherImg.setAttribute('src', 'https://www.weatherbit.io/static/img/icons/'+weather.data[0].weather.icon+'.png')
}

//Повторный запрос погоды через час
setInterval(() => GetWeather(lat,lng,SetWeatherDOM), 3600000);

//Функция выполняющая запрос на API и получающая в ответ JSON строку с параметрами погоды по указанным широте и долготе
function GetWeather(lat,lng,callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon='+lng+'&lat='+lat, true);
    xhr.setRequestHeader('X-RapidAPI-Key', 'c5aad9e91emshbec798a391a2892p1eaf1ajsn12bfa621bd58');
    xhr.setRequestHeader('X-RapidAPI-Host', 'weatherbit-v1-mashape.p.rapidapi.com');

    xhr.send();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
    
      if (xhr.status == 200) {
        var weather =JSON.parse(xhr.response);
        
        callback(weather);
      }
    }
}


