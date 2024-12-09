import { useState } from "react";
import {
  Gift,
  Cake,
  Heart,
  TreePine,
  Sparkles,
  GraduationCap,
  Sun,
  Moon,
  CloudSun,
  Zap,
} from "lucide-react";

export function CreateGreeting({
  fields = [], // Default value for `fields`
  onSubmit,
  initialValues = {}, // Default value for `initialValues`
  buttonText = "Submit", // Default value for `buttonText`
  bg
}) {
  const [formData, setFormData] = useState(initialValues);
  const [selectedBg, setSelectedBg] = useState(bg || ""); // Track the selected background

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, background: selectedBg }); // Pass selected background
  };

  const bgtemp = [
    {
      id: 1,
      type: "Birthday",
      category: "Birthday",
      icon: <Cake />,
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    {
      id: 2,
      type: "Wedding",
      category: "Wedding",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-pink-500",
    },
    {
      id: 3,
      type: "Graduation",
      category: "Graduation",
      icon: <GraduationCap />,
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 4,
      type: "Anniversary",
      category: "Anniversary",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: 5,

      type: "Christmas",
      category: "Holiday",
      icon: <TreePine />,
      color: "bg-gradient-to-r from-green-500 to-red-500",
    },
    {
      id: 6,

      type: "New Year",
      category: "Holiday",
      icon: <Sparkles />,
      color: "bg-gradient-to-r from-yellow-500 to-purple-500",
    },
    {
      id: 7,

      type: "Mother's Day",
      category: "Holiday",
      icon: <Sun />,
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
    {
      id: 8,

      type: "Father's Day",
      category: "Holiday",
      icon: <Moon />,
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      id: 9,

      type: "Get Well",
      category: "Get Well",
      icon: <CloudSun />,
      color: "bg-gradient-to-r from-teal-500 to-blue-500",
    },
    {
      id: 10,

      type: "Congratulations",
      category: "Congratulations",
      icon: <Zap />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      id: 11,

      type: "Thank You",
      category: "Thank You",
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
    },
    {
      id: 12,

      type: "Birthday",
      category: "Birthday",
      icon: <Cake />,
      color: "bg-gradient-to-r from-pink-400 to-red-400",
    },
    {
      id: 13,

      type: "Wedding",
      category: "Wedding",
      icon: <Heart />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: 14,

      type: "Graduation",
      category: "Graduation",
      icon: <GraduationCap />,
      color: "bg-gradient-to-r from-green-500 to-blue-500",
    },
    {
      id: 15,

      type: "Anniversary",
      category: "Anniversary",
      icon: <Heart />,
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
    },
    {
      id: 16,

      type: "Valentine's Day",
      category: "Holiday",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-pink-400",
    },
    {
      id: 17,

      type: "Easter",
      category: "Holiday",
      icon: <Sun />,
      color: "bg-gradient-to-r from-yellow-300 to-green-300",
    },
    {
      id: 18,
      type: "Retirement",
      category: "Congratulations",
      icon: <Sun />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      id: 19,

      type: "New Home",
      category: "Congratulations",
      icon: <Gift />,
      color: "bg-gradient-to-r from-green-400 to-blue-400",
    },
    {
      id: 20,

      type: "Sympathy",
      category: "Get Well",
      icon: <Heart />,
      color: "bg-gradient-to-r from-blue-400 to-purple-400",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create New Greeting</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={field.rows || 4}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {buttonText}
        </button>
      </form>

      {/* Preview */}
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-3">Preview</h3>
        <div
          className={`h-48 flex items-center justify-center text-white rounded-lg p-4 ${
            selectedBg || "bg-gray-200"
          }`}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {formData.recipientName || "Recipient's Name"}
            </h2>
            <p>{formData.messageContent || "Your message will appear here"}</p>
          </div>
        </div>
      </div>

      {/* Background Templates */}
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-3">Select Background</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {bgtemp.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer rounded-lg p-4 flex items-center justify-center ${
                item.color
              } ${selectedBg === item.color ? "ring-4 ring-blue-500" : ""}`}
              onClick={() => setSelectedBg(item.color)} // Update selected background
            >
              {item.icon}
              <span className="ml-2 text-white font-medium">{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
