import React from "react";

import loadingImg from "../../assets/loading.gif";

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img src={loadingImg} alt="" loading="lazy" />
    </div>
  );
}

export default Loading;
