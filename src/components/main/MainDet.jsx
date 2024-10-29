import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function MainDet({ weatherData,city }) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-start items-center">
        {weatherData ? (
          weatherData.name && (
            <p className="text-white lg:text-4xl md:text-3xl text-2xl flex items-center my-2">
              <FaLocationDot className="text-slate-300 text-2xl pl-2" />
              {city}
            </p>
          )
        ) : (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="lg:w-1/4 w-1/3">
              <Skeleton count={1} className="py-3" />
            </p>
          </SkeletonTheme>
        )}
      </div>
      <div className="w-full flex justify-start items-center my-2">
        {weatherData ? (
          weatherData.main &&
          weatherData.weather[0] && (
            <>
              <p className="lg:text-8xl text-6xl text-white flex">
                <TbTemperatureCelsius className="lg:text-5xl text-3xl" />
                {Math.floor(weatherData.main.temp)}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="icon"
                className="mr-4"
                loading="lazy"
              />
            </>
          )
        ) : (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="lg:w-1/2 w-4/5">
              <Skeleton count={1} className="py-8" />
            </p>
          </SkeletonTheme>
        )}
      </div>
      <div className="w-full">
        {weatherData ? (
          weatherData.main &&
          weatherData.weather[0] && (
            <p className="text-slate-300 lg:text-3xl md:text-2xl text-xl">
              {weatherData.weather[0].description}
            </p>
          )
        ) : (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="lg:w-1/4 w-1/3">
              <Skeleton count={1} className="py-3" />
            </p>
          </SkeletonTheme>
        )}
      </div>
      <div className="w-full my-2">
        {weatherData ? (
          weatherData.main && (
            <ul className="flex justify-start items-center">
              <li>
                <p className="flex items-center text-slate-200 lg:text-xl md:text-base text-sm">
                  احساس دما :  <TbTemperatureCelsius className="text-sm" /> {Math.floor(weatherData.main.feels_like)}
                 
                </p>
              </li>
              <li className="mr-2 border-r border-slate-400">
                <p className="flex items-center text-slate-200 lg:text-xl md:text-base text-sm lg:pr-2 pr-1">
                  رطوبت دما: %{weatherData.main.humidity}
                </p>
              </li>
              <li className="mr-2 border-r border-slate-400">
                <p className="flex items-center text-slate-200 lg:text-xl md:text-base text-sm lg:pr-2 pr-1">
                  فشار هوا : hpa {weatherData.main.pressure}
                </p>
              </li>
            </ul>
          )
        ) : (
          <SkeletonTheme baseColor="#d1d5db" highlightColor="#9ca3af">
            <p className="w-2/3">
              <Skeleton count={1} className="py-3" />
            </p>
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
}

export default MainDet;
