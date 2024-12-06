import React, { useState, useEffect } from "react";

const TemplateModal = ({ data, onClose, onCancel }) => {
  if (!data) return null;

  // State for controlling modal open/close animation
  const [isVisible, setIsVisible] = useState(true);

  // Close modal when clicked outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-background") {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Delay close to allow animation
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => onClose(), 300); // Timeout to wait for animation
    }
  }, [isVisible, onClose]);

  return (
    <div
      id="modal-background"
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-skin-background rounded-lg max-w-4xl w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onCancel(), 300); // Delay cancel to allow animation
          }}
          className="absolute top-4 right-4 text-lg font-semibold text-skin.text hover:text-skin.dark-hover transition-colors duration-300"
        >
          &times;
        </button>

        {/* Image as Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg z-0"
          style={{
            backgroundImage: `url(${
              data.useBackgroundImage ? data.image : ""
            })`,
            filter: "brightness(0.5)", // Darken image for better text readability
          }}
        />

        {/* Modal Content */}
        <div className="relative z-10 text-white">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-center mb-6">
            {data.title}
          </h2>

          {/* Template Texts */}
          <div className="mb-4">
            <h3 className="font-medium text-lg">Recipient's Name:</h3>
            <p>{data.recipientName}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">Message:</h3>
            <p>{data.message}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-lg">Category:</h3>
            <p>
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-skin.button text-white rounded-md hover:bg-skin.dark-hover transition-colors duration-300"
            >
              Use This Template
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-skin.secondary text-white rounded-md hover:bg-skin.dark-hover transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
