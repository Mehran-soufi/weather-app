import React from "react";
import Search from "./Search";
import MainDet from "./MainDet";

function RightSec({ weatherData, setCity, city }) {
  return (
    <div className="md:w-1/2 w-full md:h-full h-1/2 lg:p-12 sm:p-8 p-6 flex flex-col justify-between items-center md:items-start">
      <Search setCity={setCity} />
      <MainDet weatherData={weatherData} city={city} />
    </div>
  );
}

export default RightSec;
