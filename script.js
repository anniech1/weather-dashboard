// // // // global variables
// // // const keyAPI = "1ced721104d07f711043eeabff75388a";
// // // const API_URL = `http://api.weatherapi.com/v1/current.json?key=${keyAPI}`;

// // const API_KEY = `1ced721104d07f711043eeabff75388a`;
// // const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

// // // //retrieve and console log the data we will be using

// // // // function apiSearch(search, city){
// // // // var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + keyAPI;
// // // //     fetch(requestUrl)
// // // fetch("https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1ced721104d07f711043eeabff75388a")
// // //   .then((response) => {
// // //     if (response.ok) {
// // //       return response.json();
// // //     } else {
// // //       throw new Error("error with api");
// // //     }
// // //   })
// // //   .then(data => {
// // //     console.log(data);
// // //     displayCity(data)
// // //   })
// // //   .catch((error) => console.error("error with catch", error));

// // // function displayCity (data){
// // //     const city = data.city.name[0];
// // //     const currentcityDiv = document.getElementById("current-city");
// // //     const cocktailName = cocktail.strDrink;
// // //   const heading = document.createElement("h1");
// // //   heading.innerHTML = cocktailName;
// // //   cocktailDiv.appendChild(heading);

// // // }


// // // // var searchInputEl = document.getElementById("search-input");
// // // // var searchBtnEl = document.getElementById("search-btn");
// // // // var searchCity = "";
// // // // var searchTerm


// // // // // searchBtnEl.addEventListener("click", saveCity)

// // // // function saveCity (event) {
// // // //     event.preventDefault()
// // // //     searchTerm = event.target.value
// // // //         console.log(event.target.value)
        
// // // //     // if (searchTerm === ""){
// // // //     //     alert("Enter a city!")
// // // //     //     return
// // // //     // }
// // // //     // else 
// // // //     // (saveCity(city));
// // // //     // apiSearch(searchTerm, city)
// // // //     // input.addEventListener
// // // //     // const input = document.querySelector("#search-input")
// // // //     // input.addEventListener("click", function()
// // // //     //     console.log("input vlaue", input.value)
// // // //     //     cities.push(input.value)
// // // //     //     localStorage.setItem("cities", cities))
// // // // }

// // // // // let cities = []

// // // attempt two

// // // var button = document.querySelector('.button')
// // // var searchInput = document.querySelector('.search-input');
// // // var cityName = document.querySelector('.current-city');
// // // var temp = document.querySelector('.temp');
// // // var wind = document.querySelector('.wind');
// // // var hudmitiy = document.querySelector('.humidity');
// // // var uvIndex = document.querySelector('.uv-index')

// // // button.addEventListener('click', function(){
// // //   fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+ '&units=imperial' + '&appid=' + keyAPI)
// // //   .then(response => response.json())
// // //   .then(data => {
// // //     var nameValue = data['cityName'];
// // //     var tempValue = data['main']['temp'];
// // //     var descValue = data['weather'][0]['description'];

// // //     cityName.innerHTML = nameValue;
// // //     temp.innerHTML = tempValue;

// // //   })
// // //   .catch(err => alert("Please reenter a city name!"))
// // // })

// // attempt 3

function addResult(){

  inputCity = document.getElementById("myInput").value;  
  historyList = getInfo();
  var searchCity =$("<div>") 
  searchCity.attr('id',inputCity) 
  searchCity.text(inputCity) 
  searchCity.addClass("h4")

  
  if (historyList.includes(inputCity) === false){
      $(".history").append(searchCity)
  }
  $(".subtitle").attr("style","display:inline")
  addInfo(inputCity);
  
}; 


$(".history").on('click', function(event){
  event.preventDefault();
  $(".subtitle").attr("style","display:inline")
   document.getElementById("myInput").value =  event.target.id;
  getResult(); 
});

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener('click', getResult);

function getResult(){   

  $(".five-day").empty();
  $(".city").empty()

 inputCity = document.getElementById("myInput").value;   
  var countryCode='US';    
  var cityCode=inputCity;       
  
  var geoLon;   
  var geoLat;
      
  var cityName =$("<h>")    
  cityName.addClass("h3")  
  var temp = $("<div>")    
  var wind = $("<div>")    
  var humidity = $("<div>")   
  var uvIndex = $("<div>")   
  var dateTime = $("<div>")

  $(".city").addClass("list-group")
  $(".city").append(cityName)    
  $(".city").append(dateTime)      
  $(".city").append(temp)    
  $(".city").append(wind)    
  $(".city").append(humidity)    
  $(".city").append(uvIndex)
  
  
  var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=7d1b285353ccacd5326159e04cfab063"
      
    fetch(geoUrl)
  
      .then(function (response) {
        return response.json();
      })
  
      .then(function (data) {
        geoLon = data[0].lon;
        geoLat = data[0].lat;
          var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + "&lon="+ geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=7d1b285353ccacd5326159e04cfab063";
          
        fetch(weatherUrl)

        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          
    
      
          cityName.text(cityCode);
          var date = new Date(data.current.dt * 1000);
          dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

          temp.text("Temperature: "+ data.current.temp + " F");
          humidity.text("Humidity: " + data.current.humidity + " %");
          wind.text("Wind Speed: " + data.current.wind_speed + " MPH");


         
          for (var i=1;i<6;i++){

              var blueContainer = $("<div>")
              this["futureDate"+i] = $("<h>")
              this["futureIcon"+i] = $("<img>")
              this["futureTemp"+i] = $("<div>")
              this["futureWind"+i] = $("<div>")
              this["futureHumidity"+i] = $("<div>")
              this["forecastDay"+i] = new Date(data.daily[i].dt * 1000);     
   
              (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
              (this["futureTemp"+i]).text("Temperature: "+ data.daily[i].temp.day + " F");
              (this["futureWind"+i]).text("Wind: "+ data.daily[i].wind_speed+ " MPH");
              (this["futureHumidity"+i]).text("Humidity: " + data.daily[i].humidity + " %");
              (this["weatherIcon"+i])= data.daily[i].weather[0].icon;
      
              DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
              (this["futureIcon"+i]).attr('src',DateimgSrc)

              $(".five-day").append(blueContainer)
              blueContainer.append((this["futureDate"+i]));
              blueContainer.append((this["futureIcon"+i]));
              blueContainer.append((this["futureTemp"+i]));
              blueContainer.append((this["futureWind"+i]));
              blueContainer.append((this["futureHumidity"+i]));

              blueContainer.addClass("weather-card")
          }

        })
  })
}


function getInfo() {
  var currentList =localStorage.getItem("city");
  if (currentList !== null ){
      freshList = JSON.parse(currentList);
      return freshList;
  } else {
      freshList = [];
  }
  return freshList;
}

function addInfo (n) {
  var addedList = getInfo();

  if (historyList.includes(inputCity) === false){
      addedList.push(n);
  }
 
  localStorage.setItem("city", JSON.stringify(addedList));
};

function renderInfo () {
  var historyList = getInfo();
  for (var i = 0; i < historyList.length; i++) {
      var inputCity = historyList[i];
      var searchCity =$("<div>") 
      searchCity.attr('id',inputCity) 
      searchCity.text(inputCity) 
      searchCity.addClass("h4")

      $(".history").append(searchCity)
  }
};

renderInfo();

