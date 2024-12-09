import React from "react";
import { CreateGreeting } from "../User_components/CreateGreeting";
function Create() {
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

  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
      <CreateGreeting
        fields={fields}
        onSubmit={handleFormSubmit}
        initialValues={{
          recipientName: "",
          messageContent: "",
          category: "",
        }}
        buttonText="Create Greeting"
      />
    </div>
  );
}
export default Create;
