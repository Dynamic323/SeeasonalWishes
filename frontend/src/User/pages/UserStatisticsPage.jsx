import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Send,
  Heart,
  Star,
  TrendingUp,
  LayoutTemplateIcon as Template,
  Clock,
  Gift,
} from "lucide-react";

const userStats = [
  { icon: Send, label: "Greetings Sent", value: "42" },
  { icon: Heart, label: "Favorites Received", value: "18" },
  { icon: Star, label: "Avg. Rating", value: "4.8" },
  { icon: TrendingUp, label: "Engagement Rate", value: "76%" },
  { icon: Template, label: "Templates Used", value: "7" },
  { icon: Clock, label: "Avg. Response Time", value: "2 days" },
  { icon: Gift, label: "Gifts Sent", value: "5" },
];

const monthlyData = [
  { name: "Jan", greetings: 5 },
  { name: "Feb", greetings: 8 },
  { name: "Mar", greetings: 12 },
  { name: "Apr", greetings: 10 },
  { name: "May", greetings: 15 },
  { name: "Jun", greetings: 18 },
];

const greetingTypes = [
  { name: "Birthday", value: 20 },
  { name: "Anniversary", value: 15 },
  { name: "Holiday", value: 10 },
  { name: "Thank You", value: 8 },
  { name: "Congratulations", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function UserStatisticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Your Statistics</h2>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          {["overview", "history", "types"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-skin-accent text-skin-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStats.map(({ icon: Icon, label, value }, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
            >
              <Icon size={24} className="text-skin-accent mb-2" />
              <div className="text-sm text-skin-dark-text">{label}</div>
              <div className="text-xl font-semibold text-skin-text mt-1">
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="greetings" fill="#8884d8" name="Greetings Sent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "types" && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={greetingTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {greetingTypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
