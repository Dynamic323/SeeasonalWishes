import { useState } from "react";
import { Calendar, Clock, Mail, User, Edit, Trash2 } from "lucide-react";

// Sample data for scheduled greetings
const scheduledGreetings = [
  {
    id: 1,
    recipient: "John Doe",
    message: "Happy Birthday!",
    status: "Scheduled",
    date: "2023-12-25",
    type: "Birthday",
  },
  {
    id: 2,
    recipient: "Jane Smith",
    message: "Merry Christmas!",
    status: "Delivered",
    date: "2023-12-24",
    type: "Holiday",
  },
  {
    id: 3,
    recipient: "Bob Johnson",
    message: "Happy New Year!",
    status: "Draft",
    date: "2024-01-01",
    type: "Holiday",
  },
  {
    id: 4,
    recipient: "Alice Brown",
    message: "Congratulations on your promotion!",
    status: "Scheduled",
    date: "2023-12-30",
    type: "Congratulations",
  },
  {
    id: 5,
    recipient: "Charlie Wilson",
    message: "Happy Anniversary!",
    status: "Scheduled",
    date: "2024-01-15",
    type: "Anniversary",
  },
];

export default function Scheduled() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredGreetings = scheduledGreetings.filter(
    (greeting) =>
      greeting.recipient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || greeting.status === statusFilter)
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Scheduled Greetings</h2>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search recipients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Delivered">Delivered</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        {/* Create New Greeting Button */}
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          <Mail className="mr-2 h-4 w-4" /> Create New Greeting
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Recipient
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Message
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {filteredGreetings.map((greeting) => (
              <tr key={greeting.id} className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-800">
                  {greeting.recipient}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {greeting.message}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {greeting.type}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      greeting.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : greeting.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {greeting.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {greeting.date}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <button className="p-2 bg-gray-100 border rounded-lg shadow hover:bg-gray-200">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    {/* Delete Button */}
                    <button className="p-2 bg-gray-100 border rounded-lg shadow hover:bg-gray-200">
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
