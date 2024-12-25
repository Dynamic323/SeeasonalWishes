import { useState } from "react";
import {
  LayoutDashboard,
  PenLine,
  Calendar,
  LayoutTemplateIcon as Template,
  MessageSquare,
  Settings,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard Overview",
    path: "/user/dashboard",
  },
  {
    icon: PenLine,
    label: "Create New Greeting",
    path: "/user/dashboard/create",
  },
  {
    icon: Calendar,
    label: "Scheduled Greetings",
    path: "/user/dashboard/scheduled",
  },
  {
    icon: Template,
    label: "Templates Gallery",
    path: "/user/dashboard/templates",
  },
  {
    icon: MessageSquare,
    label: "Guestbook Messages",
    path: "/user/dashboard/guestbook",
  },
  {
    icon: Settings,
    label: "Account Settings",
    path: "/user/dashboard/settings",
  },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard Overview");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const logout = () => {
    // Clear token and user ID from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to login page or another route
    window.location.href = "/login"; // Adjust as per your routing
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-skin-dark-primary text-skin-light-text rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-skin-dark-primary text-skin-light-text transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:flex`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <h1 className="text-2xl font-bold mb-8">SeasonalWishes</h1>
          <nav>
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link key={label} to={path}>
                <button
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeItem === label
                      ? "bg-skin-dark-hover font-bold"
                      : "hover:bg-skin-dark-hover"
                  }`}
                  onClick={() => {
                    setActiveItem(label);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg mt-4 bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <Shield size={20} />
              <span>Log-out</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
