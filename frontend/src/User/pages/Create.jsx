  import React, { useState } from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
import { api } from "../../services/api"; // Make sure api.createGreeting exists in this file
import { X } from "lucide-react";

function Create() {
  const [recipientName, setRecipientName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fields = [
    { name: "recipientName", type: "text", placeholder: "Recipient's Name" },
    {
      name: "messageContent",
      type: "textarea",
      placeholder: "Message Content",
    },
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
          // recipientName, messageContent, category, background, eventDate, userId
          recipientName: formData.recipientName,
          messageContent: formData.messageContent,
          category: formData.category,
          eventDate: formData.eventDate,
          background: formData.background,
        },
        token
      );

      setSuccess("Greeting created successfully!");
      console.log("API Response:", response);

      // Reset form fields (optional)
      setRecipientName("");
      setMessageContent("");
      setCategory("");
      setEventDate("");
    } catch (err) {
      // Check if the error is from the response or a network issue
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Use the error message from the API
      } else {
        setError(err.message || "Failed to create greeting");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Error and Success messages */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-red-700 hover:text-red-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      <CreateGreeting
        fields={fields}
        onSubmit={handleFormSubmit}
        initialValues={{
          recipientName,
          messageContent,
          category,
          eventDate,
        }}
        buttonText={loading ? "Creating..." : "Create Greeting"}
      />
    </div>
  );
}

export default Create;
