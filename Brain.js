apiKey = "20ead17e4afcaaf6028d1c32c0c13f06";
apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
weatherpng = document.getElementById('weatherpng');
weatherdesc = document.getElementById('weatherdesc');
weatherphoto = document.getElementById('weatherphoto');

async function checkWeather(city)
{
    response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.getElementById('Section-1').style.display = 'none';
        document.getElementById('Section-2').style.display = 'none';
        document.querySelector('.invalid_ki_info').style.display = 'block';
    }
    else
    {
        document.getElementById('Section-1').style.display = 'block';
        document.getElementById('Section-2').style.display = 'grid';
        document.querySelector('.invalid_ki_info').style.display = 'none';

        data = await response.json();
        console.log(data);

        document.getElementById('city').innerHTML = data.name;
        
        Array.from(document.getElementsByClassName('temperature')).forEach((e)=>{
            e.innerHTML = Math.round(data.main.temp) + "°C";
        })
        
        Array.from(document.getElementsByClassName('feels')).forEach((e)=>{
            e.innerHTML = Math.round(data.main.feels_like) + "°C";
        })

        document.getElementById('pressure').innerHTML = data.main.pressure;
        document.getElementById('visibility').innerHTML = data.visibility;
        document.getElementById('longitude').innerHTML = data.coord.lon + "°";
        document.getElementById('latitude').innerHTML = data.coord.lat + "°";

        Array.from(document.getElementsByClassName('humidity')).forEach((e)=>{
            e.innerHTML = Math.round(data.main.humidity) + "%";
        })

        document.getElementById('MinTemp').innerHTML = data.main.temp_min + "°C";

        Array.from(document.getElementsByClassName('MaxTemp')).forEach((e)=>{
            e.innerHTML = Math.round(data.main.temp_max) + "°C";
        })

        Array.from(document.getElementsByClassName('wind')).forEach((e)=>{
            e.innerHTML = data.wind.speed + "Km/h";
        })

        document.getElementById('sunset').innerHTML = data.sys.sunset + "s";
        document.getElementById('sunrise').innerHTML = data.sys.sunrise + "s";

        if(data.weather[0].main == 'Clouds'){
            weatherpng.src = 'CloudyWeather.png';
            weatherdesc.innerHTML = "Mostly Cloudy";
            weatherphoto.src = 'CloudyWeatherMain.jpg';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherpng.src = 'ClearWeather.png';
            weatherdesc.innerHTML = "Mostly Sunny";
            weatherphoto.src = 'ClearWeatherMain2.webp';
        }
        else if(data.weather[0].main == 'Rain'){
            weatherpng.src = 'RainyWeather.png';
            weatherdesc.innerHTML = "Mostly Rain";
            weatherphoto.src = 'RainyWeatherMain2.jpg';
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherpng.src = 'DrizzleWeather.png';
            weatherdesc.innerHTML = "Drizzling";
            weatherphoto.src = 'DrizzleWeatherMain.jpg';
        }
        else if(data.weather[0].main == 'Mist'){
            weatherpng.src = 'MistyWeather.png';
            weatherdesc.innerHTML = "Partly Misty";
            weatherphoto.src = 'MistyWeatherMain.jpg';
        }
        }
    
}

Search = document.getElementById('Search');
Searchbox = document.getElementById('Searchbox');
Search.addEventListener('click',()=>{
    checkWeather(Searchbox.value);
})