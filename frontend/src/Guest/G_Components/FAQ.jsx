import React, { useState, useEffect } from "react";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-skin-accent last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-5 px-3 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-skin-text">{question}</span>
        <i
          className={`fas fa-chevron-down text-skin-accent transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        ></i>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="p-3 text-skin-text">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  useEffect(() => {
    // Add Font Awesome CDN
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/your-kit-code.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const questions = [
    {
      id: 0,
      question: "How far in advance can I schedule a greeting?",
      answer:
        "You can schedule greetings up to one year in advance. This allows you to plan for birthdays, anniversaries, and other special occasions well ahead of time.",
    },
    {
      id: 1,
      question: "Can I use my own images in the greetings?",
      answer:
        "Yes, you can upload and use your own images in the greetings. We support various image formats including JPG, PNG, and GIF.",
    },
    {
      id: 2,
      question: "Is there a limit to how many greetings I can send?",
      answer:
        "There's no limit to the number of greetings you can send. However, we have fair usage policies in place for our free tier users. Premium users enjoy unlimited greetings.",
    },
    {
      id: 3,
      question: "Can I edit a greeting after I've scheduled it?",
      answer:
        "Yes, you can edit your greetings at any time before they are sent. Simply go to your scheduled greetings and click the edit button to make changes.",
    },
    {
      id: 4,
      question: "What happens if the recipient doesn't have email?",
      answer:
        "If the recipient doesn't have an email, you can choose to send the greeting via SMS or generate a shareable link that you can send through any messaging platform.",
    },
  ];

  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-skin-background rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-3xl font-bold text-center  py-6 bg-gradient-autumn">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-skin-accent">
        {questions.map((q) => (
          <FAQItem
            key={q.id}
            question={q.question}
            answer={q.answer}
            isOpen={openQuestionId === q.id}
            toggleOpen={() => toggleQuestion(q.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
