let citiesArray = [
  "Paris",
  "Marseille",
  "Lyon",
  "Toulouse",
  "Nice",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Bordeaux",
  "Lille",
];

let image = document.getElementById("logo"); // Je selectionne mon image a changer en fonction de la meteo

// Boucle pour créer les <options> du <select>

for (c in citiesArray) {
  const newOption = document.createElement("option");
  let select = document.getElementById("city");
  select.appendChild(newOption);
  newOption.innerText = citiesArray[c];
  newOption.setAttribute("value", citiesArray[c]);
}

let city = document.getElementById("city"); // Je selectionne mon <select>

city.addEventListener("change", function (event) {
  let selectValue = document.getElementsByTagName("select")[0].value;
  askWeather(selectValue);
});

function askWeather(city) {
  fetch("https://www.prevision-meteo.ch/services/json/" + city)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      document.getElementById("condition").innerText = // Equivalent a .done()
        value.current_condition.condition;
      document.getElementById("day_long").innerText = value.fcst_day_0.day_long;
      document.getElementById("fcst_day_0-date").innerText =
        value.fcst_day_0.date;
      document.getElementById("city_info-sunrise").innerText =
        value.city_info.sunrise;
      document.getElementById("city_info-sunset").innerText =
        value.city_info.sunset;

      if (value.current_condition.condition == "Ensoleillé") {
        console.log("ok");
        image.src = "images/sunny.svg";
      } else if (
        value.current_condition.condition == "Ciel voilé" ||
        value.current_condition.condition == "Eclaircies"
      ) {
        image.src = "images/partly.svg";
      } else {
        image.src = "images/cloudy.svg";
      }
    })
    .catch(function (err) {
      console.log("une erreur est survenue");
    });
}
