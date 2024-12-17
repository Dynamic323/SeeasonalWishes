import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@tsparticles/react";
import {
  Gift,
  Cake,
  Heart,
  TreePine,
  Sparkles,
  GraduationCap,
  Sun,
  Moon,
  CloudSun,
  Zap,
  SnowflakeIcon as Confetti,
  PartyPopper,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

export const WishesData = [
  {
    id: 1,
    type: "Birthday",
    category: "B  irthday",
    title: "Birthday Bash",
    recipientName: "Sarah",
    message:
      "May your day be as bright as your smile and as lovely as you. Happy Birthday!",
    icon: <Cake />,
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
  {
    id: 2,
    type: "Wedding",
    category: "Wedding",
    title: "Wedding Bells",
    recipientName: "Alice and Bob",
    message:
      "Wishing you a lifetime of love and happiness. Congratulations on your wedding!",
    icon: <Heart />,
    color: "bg-gradient-to-r from-red-500 to-pink-500",
  },
  {
    id: 3,
    type: "Graduation",
    category: "Graduation",
    title: "Cap and Gown",
    recipientName: "Alex",
    message:
      "The world is your oyster now. Go forth and conquer! Congratulations on your graduation!",
    icon: <GraduationCap />,
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 4,
    type: "Anniversary",
    category: "Anniversary",
    title: "Love Birds",
    recipientName: "Emma and James",
    message:
      "Here's to another year of love, laughter, and happily ever after. Happy Anniversary!",
    icon: <Heart />,
    color: "bg-gradient-to-r from-red-500 to-orange-500",
  },
  {
    id: 5,

    type: "Christmas",
    category: "Holiday",
    title: "Christmas Cheer",
    recipientName: "The Johnson Family",
    message:
      "May the magic of Christmas fill your heart with warmth and joy. Merry Christmas!",
    icon: <TreePine />,
    color: "bg-gradient-to-r from-green-500 to-red-500",
  },
  {
    id: 6,

    type: "New Year",
    category: "Holiday",
    title: "New Beginnings",
    recipientName: "Friends and Family",
    message:
      "Cheers to new beginnings and another chance to make our dreams come true. Happy New Year!",
    icon: <Sparkles />,
    color: "bg-gradient-to-r from-yellow-500 to-purple-500",
  },
  {
    id: 7,

    type: "Mother's Day",
    category: "Holiday",
    title: "Super Mom",
    recipientName: "Mom",
    message:
      "To the world, you're a mother. To our family, you're the world. Happy Mother's Day!",
    icon: <Sun />,
    color: "bg-gradient-to-r from-orange-500 to-yellow-500",
  },
  {
    id: 8,

    type: "Father's Day",
    category: "Holiday",
    title: "Dad's Day",
    recipientName: "Dad",
    message:
      "Dad: A son's first hero, a daughter's first love. Happy Father's Day!",
    icon: <Moon />,
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    id: 9,

    type: "Get Well",
    category: "Get Well",
    title: "Speedy Recovery",
    recipientName: "Michael",
    message:
      "Sending you healing thoughts and a little sunshine to brighten your day. Get well soon!",
    icon: <CloudSun />,
    color: "bg-gradient-to-r from-teal-500 to-blue-500",
  },
  {
    id: 10,

    type: "Congratulations",
    category: "Congratulations",
    title: "Job Well Done",
    recipientName: "Emily",
    message:
      "You did it! Your hard work and perseverance have paid off. Congratulations on your success!",
    icon: <Zap />,
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    id: 11,

    type: "Thank You",
    category: "Thank You",
    title: "Gratitude",
    recipientName: "David",
    message: "Your kindness has touched my heart. Thank you for being you!",
    icon: <Gift />,
    color: "bg-gradient-to-r from-rose-500 to-pink-500",
  },
  {
    id: 12,

    type: "Birthday",
    category: "Birthday",
    title: "Sweet Sixteen",
    recipientName: "Jessica",
    message:
      "Sixteen candles on your cake, a whole world of possibilities ahead. Happy Sweet Sixteen!",
    icon: <Cake />,
    color: "bg-gradient-to-r from-pink-400 to-red-400",
  },
  {
    id: 13,

    type: "Wedding",
    category: "Wedding",
    title: "Happily Ever After",
    recipientName: "Mark and Lisa",
    message:
      "Two hearts, one love. May your journey together be filled with joy and adventure. Congratulations!",
    icon: <Heart />,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    id: 14,

    type: "Graduation",
    category: "Graduation",
    title: "Future Leader",
    recipientName: "Ryan",
    message:
      "As you graduate, remember: the best is yet to come. Embrace your future with confidence!",
    icon: <GraduationCap />,
    color: "bg-gradient-to-r from-green-500 to-blue-500",
  },
  {
    id: 15,

    type: "Anniversary",
    category: "Anniversary",
    title: "Silver Jubilee",
    recipientName: "Mr. and Mrs. Smith",
    message:
      "25 years of love, laughter, and memories. Here's to many more! Happy Silver Anniversary!",
    icon: <Heart />,
    color: "bg-gradient-to-r from-gray-400 to-gray-600",
  },
  {
    id: 16,

    type: "Valentine's Day",
    category: "Holiday",
    title: "Love is in the Air",
    recipientName: "My Valentine",
    message:
      "In a world full of people, my eyes will always search for you. Happy Valentine's Day!",
    icon: <Heart />,
    color: "bg-gradient-to-r from-red-500 to-pink-400",
  },
  {
    id: 17,

    type: "Easter",
    category: "Holiday",
    title: "Hoppy Easter",
    recipientName: "The Williams Family",
    message:
      "May your Easter basket be full of joy, happiness, and peace. Happy Easter!",
    icon: <Sun />,
    color: "bg-gradient-to-r from-yellow-300 to-green-300",
  },
  {
    id: 18,
    type: "Retirement",
    category: "Congratulations",
    title: "Golden Years",
    recipientName: "John",
    message:
      "Congratulations on your retirement! May this new chapter of your life bring you joy and relaxation.",
    icon: <Sun />,
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    id: 19,

    type: "New Home",
    category: "Congratulations",
    title: "Home Sweet Home",
    recipientName: "The Taylors",
    message:
      "May your new home be filled with love, laughter, and countless happy memories. Congratulations!",
    icon: <Gift />,
    color: "bg-gradient-to-r from-green-400 to-blue-400",
  },
  {
    id: 20,

    type: "Sympathy",
    category: "Get Well",
    title: "Thoughts and Prayers",
    recipientName: "The Brown Family",
    message:
      "During this difficult time, may you find strength in the love of family and in the warm embrace of friends.",
    icon: <Heart />,
    color: "bg-gradient-to-r from-blue-400 to-purple-400",
  },
];

const ExploreTemplates = () => {
  const [selectedWish, setSelectedWish] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Birthday",
    "Wedding",
    "Graduation",
    "Anniversary",
    "Holiday",
    "Congratulations",
    "Thank You",
    "Get Well",
  ];

  const filteredWishes = useMemo(() => {
    return WishesData.filter(
      (wish) =>
        (selectedCategory === "All" || wish.category === selectedCategory) &&
        (wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wish.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wish.recipientName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 relative overflow-hidden min-h-screen">
      <Particles
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: [
                "#FFD700",
                "#FF6347",
                "#4169E1",
                "#32CD32",
                "#FF1493",
                "#00CED1",
              ],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: ["circle", "star", "triangle"],
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
      <motion.h1
        className="text-5xl font-bold text-center mb-8 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Explore Festive Templates
      </motion.h1>
      <div className="mb-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search wishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-lg shadow-md transition-all duration-300 ease-in-out"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-6 w-6" />
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full shadow-md p-2">
            <Filter className="text-purple-500 h-6 w-6" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-full focus:outline-none text-purple-600 font-medium text-lg cursor-pointer appearance-none pr-8 bg-transparent"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 8' ...`,
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredWishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${wish.color} rounded-2xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-3">{wish.icon}</div>
              <div>
                <h2 className="text-2xl font-semibold">{wish.title}</h2>
                <p className="text-sm opacity-80">{wish.type}</p>
              </div>
            </div>
            <p className="mb-4 text-lg">Dear {wish.recipientName},</p>
            <p className="mb-6 text-lg">{wish.message}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWish(wish)}
              className={`w-full py-3 px-4 rounded-full bg-white text-gray-800 font-semibold transition-colors duration-200 flex items-center justify-center`}
            >
              <PartyPopper className="mr-2" />
              Select Wish
            </motion.button>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`${selectedWish.color} p-8 rounded-3xlshadow-2xl max-w-md w-full m-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-white">
                  {selectedWish.title}
                </h3>
                <Confetti className="text-4xl text-white" />
              </div>
              <p className="text-white text-xl mb-4">
                Dear {selectedWish.recipientName},
              </p>
              <p className="text-white text-xl mb-8">{selectedWish.message}</p>
              <div className=" flex justify-between items-center gap-12">
                <button
                  onClick={() => setSelectedWish(null)}
                  className="w-full py-2 px-3 rounded-full bg-red-500 shadow-md text-gray-800 font-semibold transition-colors duration-200 hover:bg-red-100"
                >
                  Close
                </button>

                <Link
                  to={`/user/dashboard/template/${selectedWish.id}`}
                  className="w-full py-3 px-4 rounded-full bg-white text-gray-800 font-semibold transition-colors duration-200 hover:bg-gray-100"
                >
                  <button className="">Use this Template</button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreTemplates;
