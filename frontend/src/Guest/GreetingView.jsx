import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Gift, Clock, Send, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="text-2xl font-bold">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-center mt-6">
      <Clock className="inline-block mr-2 text-indigo-600" size={24} />
      {timerComponents.length ? (
        <div className="space-x-2">{timerComponents}</div>
      ) : (
        <span className="text-2xl font-bold text-indigo-600">It's time!</span>
      )}
    </div>
  );
};

const GiftComponent = ({ onOpen }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="cursor-pointer text-center"
      onClick={onOpen}
    >
      <Gift
        size={100}
        className="text-indigo-500 hover:text-indigo-600 transition-colors mx-auto"
      />
      <p className="mt-4 text-xl font-semibold text-indigo-700">
        A surprise awaits you!
      </p>
    </motion.div>
  );
};

export default function GreetingView() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [isEventPassed, setIsEventPassed] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    if (slug) {
      api.getGreetingBySlug(slug).then((res) => setData(res));
    }
  }, [slug]);

  useEffect(() => {
    if (data?.eventDate) {
      const checkEventDate = () => {
        const now = new Date();
        const event = new Date(data.eventDate);
        setIsEventPassed(now >= event);
      };

      checkEventDate();
      const timer = setInterval(checkEventDate, 1000 * 60 * 60);
      return () => clearInterval(timer);
    }
  }, [data?.eventDate]);

  const handleGiftOpen = () => setIsGiftOpened(true);
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted:", userMessage);
    setUserMessage("");
    setShowReplyForm(false);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  const {
    background,
    eventDate,
    title,
    recipientName,
    icon,
    category,
    messageContent,
  } = data;

  return (
    <div
      className={`${
        background ? `${background}` : ""
      } min-h-screen  flex flex-col justify-between p-6 md:p-12 bg-gradient-to-br `}
      style={{
        // backgroundImage: background ? `url(${background})` : 'none',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {isEventPassed || isGiftOpened ? title : "A Special Surprise"}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md">
          {isEventPassed || isGiftOpened
            ? `To ${recipientName},`
            : "Something wonderful is coming..."}
        </h2>
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.main
          key={isEventPassed || isGiftOpened ? "greeting" : "gift"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col items-center justify-center max-w-3xl mx-auto"
        >
          <div className="bg-white bg-opacity-95 rounded-lg p-8 shadow-2xl text-center w-full backdrop-blur-md">
            {!isEventPassed && !isGiftOpened ? (
              <>
                <GiftComponent onOpen={handleGiftOpen} />
                <CountdownTimer targetDate={eventDate} />
              </>
            ) : (
              <>
                {icon && (
                  <img
                    src={icon}
                    alt="Greeting icon"
                    className="w-20 h-20 mx-auto mb-6"
                  />
                )}
                {category && (
                  <span className="inline-block bg-indigo-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                    {category}
                  </span>
                )}
                <p className="text-xl md:text-2xl mb-6 text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {messageContent}
                </p>
                {eventDate && (
                  <p className="text-md text-gray-600 mb-6">
                    {formatDate(eventDate)}
                  </p>
                )}
                {isEventPassed && (
                  <div className="mt-6">
                    {!showReplyForm ? (
                      <button
                        onClick={() => setShowReplyForm(true)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
                      >
                        <MessageCircle className="mr-2" size={20} />
                        Leave a reply
                      </button>
                    ) : (
                      <form onSubmit={handleMessageSubmit}>
                        <textarea
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          placeholder="Leave a message for the sender..."
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows="4"
                        />
                        <button
                          type="submit"
                          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
                        >
                          <Send className="mr-2" size={20} />
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.main>
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <button
          onClick={() => {
            /* Implement share functionality */
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition duration-300"
        >
          <Share2 className="mr-2" size={20} />
          Share
        </button>
        <Link to={"/login"}>
          <button
            onClick={() => {
              /* Implement create functionality */
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition duration-300"
          >
            <Gift className="mr-2" size={20} />
            Create Your Own
          </button>
        </Link>
      </motion.footer>
    </div>
  );
}
