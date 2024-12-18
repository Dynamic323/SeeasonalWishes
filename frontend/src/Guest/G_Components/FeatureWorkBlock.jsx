import React from "react";

const FeatureWorkBlock = (props) => {

  console.log(props);
  
  return (
    <div className="sm:w-[450px] lg:w-[450px] w-[350px]  bg-white rounded-lg shadow-md hover:scale-105 p-4 flex flex-col items-center justify-center">
      <p className="text-red-600 font-semibold text-[22px]">
        {/* <i className={`${props.icon}`}></i> */}
        <h4> {props.num}</h4>
      </p>
      <p className="text-black text-[25px] font-semibold pt-4">
        {props.subtext}
      </p>
      <p className="text-[15px] text-skin-text text-center">{props.text}</p>
    </div>
  );
};

export default FeatureWorkBlock;
