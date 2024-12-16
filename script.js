const WEATHER_LOCATION = document.getElementById("weather__location");
const SEARCH_BTN = document.getElementById("search__weather__btn");
const WEATHER_INFO = document.getElementById("location_info_container");
const LOADER = document.getElementById("loader");

SEARCH_BTN.addEventListener("click", async (e) => {
  //prevent browser refresh
  e.preventDefault();

  // assigning weather location value to a variable
  const LOCATION = WEATHER_LOCATION.value.trim();

  // check if user didn't input weather location
  if (WEATHER_LOCATION.value.trim().length < 3) {
    alert("please provide weather location");
    return;
  }
  LOADER.innerHTML = "Fetching location weather report...";
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=618160692ece41549ab02657241212&q=${LOCATION}`
    );

    const weather_location_report = response.data;
    console.log(weather_location_report);

    WEATHER_INFO.innerHTML = `
    <div>
     <h2>Location:${weather_location_report.location.name},${weather_location_report.location.country}</h2>
     <img src=${weather_location_report.current.condition.icon} alt=${weather_location_report.location.name} />
      <h2>Temperature:${weather_location_report.current.temp_c},${weather_location_report.current.temp_f}</h2>
      <h3>Description:${weather_location_report.current.condition.text} </h3>
     </div>`;
    WEATHER_LOCATION.value = "";
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      alert(`Search for Weather:${LOCATION}: was not found`);
    }
    console.log(error);
  } finally {
    LOADER.innerHTML = "";
  }

  console.log(WEATHER_LOCATION.value);
});
