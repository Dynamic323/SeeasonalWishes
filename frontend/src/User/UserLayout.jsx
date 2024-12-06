import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "./User_components/Sidebar";

export default function Dashboard() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Map routes to titles
    const pathToTitle = {
      "/user/dashboard": "Dashboard",
      "/user/dashboard/create": "Create Greeting",
      "/user/dashboard/scheduled": "Scheduled Greetings",
      "/user/dashboard/templates": "Templates",
      "/user/dashboard/guestbook": "Guestbook",
      "/user/dashboard/settings": "Settings",
    };

    setTitle(pathToTitle[location.pathname] || "Dashboard");
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-autumn">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-skin-text">{title}</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
