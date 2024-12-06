import { useState } from "react";

export function CreateGreeting() {
  const [recipientName, setRecipientName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Populate the form fields if a template is selected
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setRecipientName(template.recipientName);
    setMessageContent(template.message);
    setSelectedCategory(template.category); // Sync with the form's category
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create New Greeting</h2>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Recipient's Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full p-3 border border-skin-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-accent"
          />
        </div>
        <div>
          <textarea
            placeholder="Message Content"
            rows="4"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="w-full p-3 border border-skin-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-accent"
          />
        </div>
        <div>
          <input
            type="date"
            className="w-full p-3 border border-skin-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-accent"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-skin-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-accent"
          >
            <option value="" disabled>Select Category</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="graduation">Graduation</option>
            <option value="wedding">Wedding</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-skin-button text-skin-light-text rounded-lg hover:opacity-90 transition-opacity"
        >
          Create Greeting
        </button>
      </form>
    </div>
  );
}
