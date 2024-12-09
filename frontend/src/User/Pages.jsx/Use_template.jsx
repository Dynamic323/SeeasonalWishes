import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { WishesData } from "../../Guest/pages/ExploreTemplates";
import { CreateGreeting } from "../User_components/CreateGreeting";

function Use_template() {
  const { id } = useParams();

  // Find the template by ID
  const result = WishesData.filter((wish) => wish.id === parseInt(id, 10));
  if (!result || result.length === 0) {
    return <div>Template not found or loading...</div>;
  }

  // Destructure data from the first result
  const { recipientName, title, message, category, bg } = result[0];

  // State for the form fields
  const [recipient, setRecipientName] = useState(recipientName || "");
  const [messageContent, setMessageContent] = useState(message || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selctedbg, setselectedbg] = useState(bg || "");

  // Form fields configuration
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
  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Use Template</h2>
      <CreateGreeting
        fields={fields}
        onSubmit={handleFormSubmit}
        initialValues={{
          recipientName: recipient,
          messageContent: messageContent,
          category: selectedCategory,
          bg:selctedbg,
        }}
        buttonText="Create Greeting"
      />
    </div>
  );
}

export default Use_template;
