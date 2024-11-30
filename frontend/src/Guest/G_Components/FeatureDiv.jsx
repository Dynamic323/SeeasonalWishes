import React from "react";

const FeatureDiv = (props) => {
  console.log(props);

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md transition-all hover:scale-105  flex flex-col items-center justify-center">
      <div className="flex items-center space-x-5 lg:pb-4 sm:pb-4 pb-2 text-center">
        {/* <FontAwesomeIcon
        icon={props.icon}
        className="text-red-600 lg:text-2xl sm:text-2xl text-xl"
      /> */}
        <i
          className={`${props.icon}  text-red-600 lg:text-2xl sm:text-2xl text-xl`}
        ></i>
        <p className="text-richburgundy lg:text-[25px] sm:text-[18px] text-[18px]  text-center  font-semibold ">
          {props.subtext}
        </p>
      </div>
      <p className="text-[15px] text-deepcharc text-center">{props.text}</p>
    </div>
  );
};

export default FeatureDiv;
