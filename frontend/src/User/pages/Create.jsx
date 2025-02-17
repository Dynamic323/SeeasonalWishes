import React, { useState } from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
import { api } from "../../services/api";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../NotificationSystem";

function Create() {
  const [recipientName, setRecipientName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    success: { show: false, message: "" },
    error: { show: false, message: "" },
  });

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
        { value: "christmas", label: "Christmas" },
        { value: "new year", label: "New Year" },
        { value: "mother's day", label: "Mother's Day" },
        { value: "father's day", label: "Father's Day" },
        { value: "congratulations", label: "Congratulations" },
        { value: "valentine's day", label: "Valentine's Day" },
        { value: "easter", label: "Easter" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    // Reset notifications
    setNotification({
      success: { show: false, message: "" },
      error: { show: false, message: "" },
    });

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await api.createGreeting(
        {
          recipientName: formData.recipientName,
          messageContent: formData.messageContent,
          category: formData.category,
          eventDate: formData.eventDate,
          background: formData.background,
          userId,
        },
        token
      );

      // Show success notification
      setNotification({
        success: { show: true, message: "Greeting created successfully!" },
        error: { show: false, message: "" },
      });

      // Reset form fields
      setRecipientName("");
      setMessageContent("");
      setCategory("");
      setEventDate("");
    } catch (err) {
      // Format validation error message
      let errorMessage = "Failed to create greeting";

      if (err.message && err.message.includes("Greeting validation failed")) {
        errorMessage = "Please fill in all required fields: ";
        const validationErrors = err.message.split(":")[1].split(",");
        errorMessage += validationErrors
          .map((error) =>
            error.split(":")[0].trim().replace("Path `", "").replace("`", "")
          )
          .join(", ");
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      // Show error notification
      setNotification({
        success: { show: false, message: "" },
        error: { show: true, message: errorMessage },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessNotification
        isVisible={notification.success.show}
        onClose={() =>
          setNotification((prev) => ({
            ...prev,
            success: { show: false, message: "" },
          }))
        }
        message={notification.success.message}
      />

      <ErrorNotification
        isVisible={notification.error.show}
        onClose={() =>
          setNotification((prev) => ({
            ...prev,
            error: { show: false, message: "" },
          }))
        }
        message={notification.error.message}
      />

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
    </>
  );
}

export default Create;
