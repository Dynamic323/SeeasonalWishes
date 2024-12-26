import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MessageCircle } from "lucide-react";
import { api } from "../../services/api";

const UserGuestbookPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        const response = await api.getRepliesForUser({ userId: userId });
        setMessages(response.data); // Adjust based on your API's response structure
      } catch (err) {
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, [userId]);

  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const currentMessages = messages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-skin-background rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-8 text-skin-text text-center">
        Your Guestbook
      </h2>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {currentMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-skin-primary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-skin-text">
                    {message.sender}
                  </h3>
                  <p className="text-sm text-skin-dark-text">{message.date}</p>
                </div>
                <div className="flex items-center bg-skin-accent bg-opacity-10 px-3 py-1 rounded-full">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < message.rating
                          ? "text-skin-accent"
                          : "text-skin-dark-text"
                      }
                      fill={index < message.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="text-skin-accent mr-3 mt-1 flex-shrink-0" />
                <p className="text-skin-text italic">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-8 flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-skin-button text-skin-light-text rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ChevronLeft size={20} className="mr-2" />
          Previous
        </button>
        <div className="text-skin-text font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-skin-button text-skin-light-text rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Next
          <ChevronRight size={20} className="ml-2" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default UserGuestbookPage;
