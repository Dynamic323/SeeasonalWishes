import React from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
    function Create() {


  return (
    <>
      <div className="flex md:justify-center items-center">
        <div className="w-[60%]">
          <CreateGreeting />
        </div>
      </div>
    </>
  );
}

export default Create;
