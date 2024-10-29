import React from "react";

import errorImg from "../../assets/error.png";

function Error() {
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <img src={errorImg} alt="مشکلی پیش آمده..." />
      <p className="w-11/12 flex justify-center items-center text-black lg:text-2xl sm:text-xl text-base">
        متاسفانه به نظر میرسد مشکلی پیش آمده و چند لحظه بعد مجددا تلاش کنید.
      </p>
      <button
        onClick={handleRetry}
        className="border-none outline-none bg-cyan-600 text-white mt-4 px-4 py-2 lg:text-2xl sm:text-xl text-base rounded-md transition duration-75 hover:bg-cyan-700 transform hover:scale-90 shadow-md shadow-cyan-800"
      >
        تلاش مجدد
      </button>
    </div>
  );
}

export default Error;
