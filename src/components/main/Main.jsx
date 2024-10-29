import React, { useEffect, useState } from "react";
import RightSec from "./RightSec";
import LeftSec from "./LeftSec";
import axios from "axios";
import Loading from "../loading/Loading";
import Error from "../error/Error";

// import images for background
import cloudy from "../../assets/cloudy.jpg";
import clearSky from "../../assets/clearSky.jpg";
import partyCloudy from "../../assets/partyCloudy.jpg";
import rainy from "../../assets/rainy.jpg";
import heavyRain from "../../assets/heavyRain.jpg";
import snowy from "../../assets/snowy.jpg";
import foggy from "../../assets/foggy.jpg";
import stormy from "../../assets/stormy.jpg";
import hail from "../../assets/hail.jpg";

function Main() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState("تهران");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2f6a6662c57e4b5617eb19734c81966&units=metric&lang=fa`
      );
      setWeatherData(data);
      setLoading(false);
      setError(false);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getData(city);
  }, [city]);

  const getBackgroundImage = (description) => {
    switch (description) {
      case "آسمان صاف":
        return clearSky;
      case "کمی ابری":
      case "ابرهای پراکنده":
      case "ابرهای شکسته":
        return partyCloudy;
      case "بارش باران":
      case "باران":
        return rainy;
      case "رعد و برق":
        return stormy;
      case "برف":
        return snowy;
      case "مه آلود":
        return foggy;
      case "تگرگ":
        return hail;
      default:
        return cloudy;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <main
          className="w-full md:h-screen h-[200vh]"
          style={{
            backgroundImage: `url(${
              weatherData
                ? getBackgroundImage(weatherData.weather[0].description)
                : cloudy
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full h-full bg-black/60 flex md:flex-row flex-col justify-between items-center">
            <RightSec weatherData={weatherData} setCity={setCity} city={city} />
            <LeftSec lat={lat} lon={lon} />
          </div>
        </main>
      )}
    </>
  );
}

export default Main;
