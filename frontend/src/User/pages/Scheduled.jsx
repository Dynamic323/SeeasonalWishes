import { useState, useEffect } from "react";
import { Calendar, Mail, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom"; // Link for navigation
import { api } from "../../services/api";

export default function Scheduled() {
  const [greetings, setGreetings] = useState([]); // State for greetings
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const AppUrl = import.meta.env.VITE_APP_URL;

  const token = localStorage.getItem("token"); // Get token from local storage (or context)
  const userId = localStorage.getItem("userId"); // Get token from local storage (or context)

  // Fetch greetings from API
  const fetchGreetings = async () => {
    try {
      setLoading(true);
      const data = await api.fetchUserGreetings(userId, token);

      // console.log("Fetched greetings:", data);

      setGreetings(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching greetings:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete greeting
  const handleDelete = async (greetingId) => {
    try {
      await api.deleteGreeting(greetingId, token); // Pass the greetingId for deletion
      fetchGreetings(); // Refetch greetings after deletion
    } catch (error) {
      console.error("Error deleting greeting:", error.message);
    }
  };

  // Fetch greetings on component mount
  useEffect(() => {
    fetchGreetings();
  }, []);

  // Filter greetings based on search term and status
  const filteredGreetings = greetings.filter(
    (greeting) =>
      greeting.recipientName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" ||
        greeting.status?.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleCopyToClipboard = (e, greeting) => {
    e.preventDefault(); // Prevent navigation to the link when copying
    const textToCopy = `${AppUrl}whish/${greeting.slug}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
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

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-600">Loading greetings...</div>
      ) : (
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
                  External Link
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
                <tr key={greeting.slug} className="border-t">
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {greeting.recipientName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {greeting.messageContent.length > 20
                      ? `${greeting.messageContent.slice(0, 20)}...`
                      : "lol"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    <Link
                      to={`/whish/${greeting.slug}`}
                      onClick={(e) => handleCopyToClipboard(e, greeting)} // Pass e and greeting correctly
                      className="p-2 bg-gray-100 border flex gap-2 rounded-lg shadow hover:bg-gray-200"
                    >
                      {AppUrl}
                      {greeting.slug}
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </Link>
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
                    {new Date(greeting.eventDate).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                      weekday: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      {/* View Button */}

                      {/* Edit Button */}
                      <button className="p-2 bg-gray-100 border rounded-lg shadow hover:bg-gray-200">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(greeting._id)}
                        className="p-2 bg-red-100 border rounded-lg shadow hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
