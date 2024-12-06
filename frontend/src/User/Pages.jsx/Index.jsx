import React from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
import { ScheduledGreetings } from "../User_components/ScheduledGreetings";
import { GuestbookMessages } from "../User_components/GuestbookMessages";
import { UserStatisticsPage } from "./UserStatisticsPage";

function Index() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CreateGreeting />
        <ScheduledGreetings />
        <GuestbookMessages />
      </div>

      <UserStatisticsPage />
    </div>
  );
}

export default Index;
