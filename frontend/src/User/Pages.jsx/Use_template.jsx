import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WishesData } from "../../Guest/pages/ExploreTemplates";
import { CreateGreeting } from "../User_components/CreateGreeting";
import { api } from "../../services/api"; // Import your API functions

function Use_template() {
  const { id } = useParams();

  // Find the template by ID
  const result = WishesData.filter((wish) => wish.id === parseInt(id, 10));

  // Handle case where template is not found
  if (!result || result.length === 0) {
    return <div>Template not found or loading...</div>;
  }

  // Destructure data from the first result
  const { recipientName = "", title = "", message = "", category = "", color = "", icon = "" } = result[0];

  // State for the form fields
  const [recipient, setRecipientName] = useState(recipientName || "");
  const [messageContent, setMessageContent] = useState(message || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedBg, setSelectedBg] = useState(color || "");
  const [eventDate, setEventDate] = useState(""); // Add state for event date
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(null); // State for success messages

  // Form fields configuration
  const fields = [
    { name: "recipientName", type: "text", placeholder: "Recipient's Name" },
    { name: "messageContent", type: "textarea", placeholder: "Message Content" },
    { name: "eventDate", type: "date", placeholder: "Event Date" },
    {
      name: "category",
      type: "select",
      placeholder: "Select Category",
      options: [
        { value: "birthday", label: "Birthday" },
        { value: "anniversary", label: "Anniversary" },
        { value: "graduation", label: "Graduation" },
        { value: "wedding", label: "Wedding" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token"); // Get token from local storage (or context)

    try {
      // Call the API to create a greeting
      const response = await api.createGreeting(
        {
          recipient: formData.recipientName,
          message: formData.messageContent,
          category: formData.category,
          date: formData.eventDate,
        },
        token
      );

      setSuccess("Greeting created successfully!");
      console.log("API Response:", response);

      // Reset form fields (optional)
      setRecipientName("");
      setMessageContent("");
      setSelectedCategory("");
      setEventDate("");
      setSelectedBg("");
    } catch (err) {
      setError(err.message || "Failed to create greeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Use Template</h2>
      <div
        className={` ${selectedBg} p-6 rounded-lg`}
        style={{ backgroundColor: selectedBg }}
      >
        <img
          src={icon}
          alt={category}
          className="w-full h-24 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <p className="text-center">{message}</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <CreateGreeting
        fields={fields}
        onSubmit={handleFormSubmit}
        initialValues={{
          recipientName: recipient,
          messageContent: messageContent,
          category: selectedCategory,
          bg: selectedBg,
        }}
        buttonText={loading ? "Creating..." : "Create Greeting"}
      />
    </div>
  );
}

export default Use_template;
