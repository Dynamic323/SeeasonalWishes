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
  fields = [],
  onSubmit,
  initialValues = {},
  buttonText = "Submit",
}) {
  const [formData, setFormData] = useState(initialValues);
  const [selectedBg, setSelectedBg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, background: selectedBg });
  };

  const bgTemplates = [
    {
      id: 1,
      type: "Birthday",
      icon: <Cake />,
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    {
      id: 2,
      type: "Wedding",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-pink-500",
    },
    {
      id: 3,
      type: "Graduation",
      icon: <GraduationCap />,
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 4,
      type: "Anniversary",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: 5,
      type: "Christmas",
      icon: <TreePine />,
      color: "bg-gradient-to-r from-green-500 to-red-500",
    },
    {
      id: 6,
      type: "New Year",
      icon: <Sparkles />,
      color: "bg-gradient-to-r from-yellow-500 to-purple-500",
    },
    {
      id: 7,
      type: "Mother's Day",
      icon: <Sun />,
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
    {
      id: 8,
      type: "Father's Day",
      icon: <Moon />,
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    {
      id: 9,
      type: "Get Well",
      icon: <CloudSun />,
      color: "bg-gradient-to-r from-teal-500 to-blue-500",
    },
    {
      id: 10,
      type: "Congratulations",
      icon: <Zap />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      id: 11,
      type: "Thank You",
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
    },
    {
      id: 12,
      type: "Birthday",
      icon: <Cake />,
      color: "bg-gradient-to-r from-pink-400 to-red-400",
    },
    {
      id: 13,
      type: "Wedding",
      icon: <Heart />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: 14,
      type: "Graduation",
      icon: <GraduationCap />,
      color: "bg-gradient-to-r from-green-500 to-blue-500",
    },
    {
      id: 15,
      type: "Anniversary",
      icon: <Heart />,
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
    },
    {
      id: 16,
      type: "Valentine's Day",
      icon: <Heart />,
      color: "bg-gradient-to-r from-red-500 to-pink-400",
    },
    {
      id: 17,
      type: "Easter",
      icon: <Sun />,
      color: "bg-gradient-to-r from-yellow-300 to-green-300",
    },
    {
      id: 18,
      type: "Retirement",
      icon: <Sun />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      id: 19,
      type: "New Home",
      icon: <Gift />,
      color: "bg-gradient-to-r from-green-400 to-blue-400",
    },
    {
      id: 20,
      type: "Sympathy",
      icon: <Heart />,
      color: "bg-gradient-to-r from-blue-400 to-purple-400",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create New Greeting</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.placeholder}
            </label>
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

        {/* Background Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Select Background</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {bgTemplates.map((template) => (
              <div
                key={template.id}
                className={`cursor-pointer rounded-lg p-4 flex items-center justify-center ${
                  template.color
                } ${selectedBg === template.color ? "ring-4 ring-blue-500" : ""}`}
                onClick={() => setSelectedBg(template.color)}
              >
                {template.icon}
                <span className="ml-2 text-white font-medium">
                  {template.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6">
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

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
