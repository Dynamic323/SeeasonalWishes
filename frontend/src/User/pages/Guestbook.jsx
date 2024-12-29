import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Trash2,
  Clock,
} from "lucide-react";
import { api } from "../../services/api";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../NotificationSystem";

// Filter component remains the same
const MessageFilter = ({ onFilterChange, currentFilter }) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Clock className="text-skin-accent" size={20} />
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-skin-background border border-skin-accent rounded-lg px-4 py-2 text-skin-text focus:outline-none focus:ring-2 focus:ring-skin-accent"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

const UserGuestbookPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("latest");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [notification, setNotification] = useState({
    success: { show: false, message: "" },
    error: { show: false, message: "" },
  });

  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        setLoading(true);
        const data = await api.fetchUserGreetings(userId, token);

        const formattedMessages = data.map((greeting) => ({
          ...greeting,
          replies: greeting.replies.map((reply) => ({
            ...reply,
            senderName: greeting.recipientName,
          })),
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching greetings:", error.message);
        setNotification({
          success: { show: false, message: "" },
          error: {
            show: true,
            message: "Failed to load messages. Please try again.",
          },
        });
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGreetings();
  }, [userId]);

  const handleDelete = async (replyId, greetingId) => {
    try {
      const result = await api.deleteReply(greetingId, replyId);
      if (result.message === "Reply deleted successfully") {
        setNotification({
          success: { show: true, message: result.message },
          error: { show: false, message: "" },
        });

        setMessages((prevMessages) =>
          prevMessages.map((greeting) => ({
            ...greeting,
            replies:
              greeting._id === greetingId
                ? greeting.replies.filter((reply) => reply._id !== replyId)
                : greeting.replies,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to delete the message:", err);
      setNotification({
        success: { show: false, message: "" },
        error: {
          show: true,
          message: "Failed to delete the message. Please try again.",
        },
      });
    }
  };

  // Rest of the helper functions remain the same
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (filter === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const totalPages = Math.ceil(sortedMessages.length / messagesPerPage || 0);
  const currentMessages = sortedMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-skin-text">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>;
  }

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-skin-background rounded-xl shadow-lg"
      >
        {/* Rest of the JSX remains the same */}
        <h2 className="text-3xl font-bold mb-8 text-skin-text text-center">
          Your Guestbook
        </h2>

        <MessageFilter
          onFilterChange={handleFilterChange}
          currentFilter={filter}
        />

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {currentMessages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-skin-primary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-skin-text">
                      {message.recipientName}
                    </h3>
                  </div>
                  <div className="flex items-center bg-skin-accent bg-opacity-10 px-3 py-1 rounded-full">
                    <p className="text-sm text-skin-dark-text">
                      {new Date(message.createdAt).toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                        weekday: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start w-full">
                    <MessageCircle className="text-skin-accent mr-3 mt-1 flex-shrink-0" />
                    {message.replies.length > 0 ? (
                      <div className="w-full space-y-3">
                        {message.replies.map((reply) => (
                          <div
                            key={reply._id}
                            className="flex items-start justify-between group bg-skin-background p-3 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-skin-accent">
                                {reply.senderName}:
                              </span>
                              <span className="ml-2 text-skin-text">
                                {reply.replyContent}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleDelete(reply._id, message._id)
                              }
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                              title="Delete reply"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-skin-text italic bg-violet-400 p-3 rounded-lg w-full">
                        <p>
                          Message sent to{" "}
                          <span className="font-medium text-skin-accent">
                            {message.recipientName}
                          </span>{" "}
                          is awaiting reply
                        </p>
                      </div>
                    )}
                  </div>
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
    </>
  );
};

export default UserGuestbookPage;
