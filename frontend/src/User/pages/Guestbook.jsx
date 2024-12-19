import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data for guestbook messages
const allMessages = Array(50)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    sender: `Sender ${index + 1}`,
    message: `Thank you for the wonderful ${
      index % 2 === 0 ? "birthday" : "holiday"
    } wishes! It really made my day special.`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      .toISOString()
      .split("T")[0],
    rating: Math.floor(Math.random() * 5) + 1,
  }));

export default function UserGuestbookPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  const totalPages = Math.ceil(allMessages.length / messagesPerPage);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = allMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
}
