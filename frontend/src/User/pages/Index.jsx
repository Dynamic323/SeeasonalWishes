import React from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
import { ScheduledGreetings } from "../User_components/ScheduledGreetings";
import { GuestbookMessages } from "../User_components/GuestbookMessages";
import { UserStatisticsPage } from "./UserStatisticsPage";

function Index() {
  return (
    <div>
      <div className="grid grid-cols-1 items-center justify-center lg:grid-cols-3 gap-6 mb-8">
        <div className="">
          <h1 className="py-6 text-2xl font-semibold">Create a new message</h1>
          <button
            type="submit"
            className="w-full h-fit py-3 bg-skin-button text-white rounded-lg hover:bg-skin-button  transition"
          >
            Create Greeting Message
          </button>
        </div>
        <ScheduledGreetings />
        <GuestbookMessages />
      </div>

      <UserStatisticsPage />
    </div>
  );
}

export default Index;
