const button = document.querySelector("#button");

button.addEventListener("click", () => getData());
document.addEventListener("keydown", function (enter) {
  if (enter.keyCode === 13) {
    button.click();
  }
});

async function getData() {
  document.querySelector("#errorSpace").classList.remove("opacity_1");
  const city = document
    .querySelector("#inputCity")
    .value.replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "");
  console.log(city);
  if (city === "") {
    document.querySelector("#errorSpace").classList.add("opacity_1");
    return;
  }
  const country =
    "," +
    document
      .querySelector("#inputCountry")
      .value.replace(/\s+/g, " ")
      .replace(/^\s+|\s+$/g, "");
  console.log(country);
  const temp = document.querySelector("#tempIndex");
  const tempFeelsLike = document.querySelector("#feelsLikeIndex");
  const tempMin = document.querySelector("#tempMinIndex");
  const tempMax = document.querySelector("#tempMaxIndex");
  const windSpeed = document.querySelector("#windSpeedIndex");
  const windDirection = document.querySelector("#windDirectionIndex");
  const humidity = document.querySelector("#humidityIndex");
  const pressure = document.querySelector("#pressureIndex");
  const clouds = document.querySelector("#cloudsIndex");
  const rain = document.querySelector("#rainIndex");
  const snow = document.querySelector("#snowIndex");
  const date = document.querySelector("#dateIndex");
  const resCity = document.querySelector("#city");
  const resCountry = document.querySelector("#country");
  const mainDescription = document.querySelector("#mainDescription");
  const description = document.querySelector("#description");
  const icon = document.querySelector("#icon");
  const general = document.querySelector(".general");
  const detailsLeft = document.querySelector(".details_left");
  const detailsRight = document.querySelector(".details_right");
  const error = document.querySelector("#error");
  const url =
    "https://api.openweathermap.org/data/2.5/find?q=" +
    city +
    country +
    "&units=metric&appid=1898add0562c3fccf120516f2bed3463";
  const url2 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    country +
    "&units=metric&appid=1898add0562c3fccf120516f2bed3463";
  const response = await fetch(url);
  const data = await response.json();
  const response2 = await fetch(url2);
  const data2 = await response2.json();
  if (data.list[0] === undefined) {
    console.log("Error");
    general.style.display = "none";
    detailsLeft.style.display = "none";
    detailsRight.style.display = "none";
    error.style.display = "block";
    return;
  }
  console.log(data);
  console.log(data2);
  if (data.message === "accurate") {
    const temperature = Math.round(data.list[0].main.temp);
    const temperatureFeels = Math.round(data.list[0].main.feels_like);
    if (temperature < 0) {
      temp.innerHTML = temperature;
    } else {
      temp.innerHTML = "+" + temperature;
    }
    if (temperatureFeels < 0) {
      tempFeelsLike.innerHTML = temperatureFeels;
    } else {
      tempFeelsLike.innerHTML = "+" + temperatureFeels;
    }
    resCity.innerHTML = data.list[0].name;
    resCountry.innerHTML = data.list[0].sys.country;
    mainDescription.innerHTML = data.list[0].weather[0].main;
    description.innerHTML = data.list[0].weather[0].description;
    tempMin.innerHTML = data.list[0].main.temp_min;
    tempMax.innerHTML = data.list[0].main.temp_max;
    windSpeed.innerHTML = data.list[0].wind.speed + " m/s";
    windDirection.innerHTML = data.list[0].wind.deg + " deg";
    humidity.innerHTML = data.list[0].main.humidity + " %";
    const dateRes = new Date((data2.dt + data2.timezone) * 1000);
    var hours = dateRes.getUTCHours() + ":";
    var minutes = dateRes.getUTCMinutes() + " ";
    var days = dateRes.getUTCDate() + "/";
    var months = dateRes.getUTCMonth() + 1 + "/";
    var years = dateRes.getUTCFullYear();
    console.log(dateRes.getUTCMonth());
    if (dateRes.getUTCHours() < 10) {
      hours = "0" + hours;
    }
    if (dateRes.getUTCMinutes() < 10) {
      minutes = "0" + minutes;
    }
    if (dateRes.getUTCDate() < 10) {
      days = "0" + days;
    }
    if (dateRes.getUTCMonth() < 10) {
      months = "0" + months;
    }
    var time = hours + minutes + days + months + years;
    date.innerHTML = time;
    pressure.innerHTML =
      Math.round(data.list[0].main.pressure / 1.3333) + " mm";
    clouds.innerHTML = data.list[0].clouds.all + " %";
    const rainResponse = data.list[0].rain;
    const snowResponse = data.list[0].snow;
    if (rainResponse !== null) {
      rain.innerHTML = rainResponse[Object.keys(rainResponse)[0]] + " mm/h";
    }
    if (snowResponse !== null) {
      snow.innerHTML = snowResponse[Object.keys(snowResponse)[0]] + " mm/h";
    }
    const iconIndex = data.list[0].weather[0].icon;
    icon.src = "https://openweathermap.org/img/wn/" + iconIndex + "@2x.png";
    general.style.display = "flex";
    detailsLeft.style.display = "block";
    detailsRight.style.display = "block";
    error.style.display = "none";
  } else {
    general.style.display = "none";
    detailsLeft.style.display = "none";
    detailsRight.style.display = "none";
    error.style.display = "block";
    return;
  }
}

//Color schemes//
const changeColorButton = document.querySelector(".color_scheme");
const colors = [
  "#735f94",
  "#b8a7d4",
  "#575f75",
  "#7c86a1",
  "#4a5c45",
  "#5f7559",
  "#5e5a4d",
  "#8f8a7c",
];
var n = 2;
var m = 3;
function changeColor() {
  var color1 = colors[n];
  var color2 = colors[m];
  var root = document.documentElement;
  root.style.setProperty("--color1", color1);
  root.style.setProperty("--color2", color2);
  n = n + 2;
  m = m + 2;
  if (n === 8) {
    n = 0;
    m = 1;
  }
}
changeColorButton.addEventListener("click", () => changeColor());

var utcGlobal = new Date(new Date() - 18000000);
var utcLocal;
