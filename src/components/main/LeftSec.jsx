import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { TbTemperatureCelsius } from "react-icons/tb";
import moment from "moment-jalaali";
import Error from "../error/Error";
moment.loadPersian({ usePersianDigits: true });

function LeftSec({ lon, lat }) {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getForecastData = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fa`
      );
      setLoading(false);
      setError(false);
      setForecastData(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getForecastData();
  }, []);

  const getDailyForecasts = (list) => {
    const dailyForecasts = [];
    const seenDates = new Set();

    list.forEach((item) => {
      const date = moment.unix(item.dt).format("YYYY-MM-DD");
      if (!seenDates.has(date)) {
        seenDates.add(date);
        const dayData = list.filter(
          (i) => moment.unix(i.dt).format("YYYY-MM-DD") === date
        );
        const minTemp = Math.min(...dayData.map((i) => i.main.temp_min));
        const maxTemp = Math.max(...dayData.map((i) => i.main.temp_max));
        const dominantWeather = dayData.reduce((acc, curr) => {
          acc[curr.weather[0].icon] = (acc[curr.weather[0].icon] || 0) + 1;
          return acc;
        }, {});
        const dominantIcon = Object.keys(dominantWeather).reduce((a, b) =>
          dominantWeather[a] > dominantWeather[b] ? a : b
        );

        dailyForecasts.push({
          date: date,
          minTemp: minTemp,
          maxTemp: maxTemp,
          icon: dominantIcon,
          dt: item.dt,
        });
      }
    });

    return dailyForecasts;
  };

  return (
    <div className="md:w-2/3 w-full md:h-full h-1/2 flex flex-col justify-center items-center">
      <div className="w-full my-2 flex justify-center items-center">
        {forecastData ? (
          <div className="py-2 px-4 lg:w-1/2 w-11/12 bg-white/20 rounded-md border border-white">
            <p className="w-full pb-2 text-slate-200 border-b border-slate-300">
              پیش بینی 5 ساعت آینده
            </p>
            <ul className="w-full flex justify-between items-center">
              {forecastData.list.slice(0, 5).map((item, index) => (
                <li
                  className="flex flex-col justify-between items-center"
                  key={index}
                >
                  <span className="text-slate-300">
                    {moment.unix(item.dt).format("HH:mm")}
                  </span>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="icon"
                    className="w-14 my-1"
                  />
                  <p className="flex items-center text-slate-300">
                    <TbTemperatureCelsius />
                    {item.main.temp.toFixed(0)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : loading ? (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="lg:w-1/2 w-11/12">
              <Skeleton count={1} className="py-14" />
            </p>
          </SkeletonTheme>
        ) : (
          <Error />
        )}
      </div>
      <div className="w-full my-2 flex justify-center items-center">
        {forecastData ? (
          <div className="py-2 px-4 lg:w-1/2 w-11/12 bg-white/20 rounded-md border border-white">
            <p className="w-full pb-2 text-slate-200 border-b border-slate-300">
              پیش بینی 5 روز آینده
            </p>
            <ul className="w-full flex flex-col justify-between items-center">
              {getDailyForecasts(forecastData.list)
                .slice(0, 5)
                .map((item, index) => (
                  <li className="flex justify-between items-center" key={index}>
                    <span className="text-slate-300">
                      {moment.unix(item.dt).format("dddd")}
                      <span className="mr-1">
                        {moment.unix(item.dt).format("jD jMMMM")}
                      </span>
                    </span>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt="icon"
                      className="w-14 my-1"
                    />
                    <p className="flex items-center text-slate-300">
                      <TbTemperatureCelsius />
                      {item.maxTemp.toFixed(0)}
                    </p>
                    <span className="py-[1px] w-24 rounded-md bg-gradient-to-r from-cyan-500 to-purple-800 mx-2"></span>
                    <p className="flex items-center text-slate-300">
                      <TbTemperatureCelsius />
                      {item.minTemp.toFixed(0)}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ) : loading ? (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="lg:w-1/2 w-11/12">
              <Skeleton count={1} className="py-48" />
            </p>
          </SkeletonTheme>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default LeftSec;
