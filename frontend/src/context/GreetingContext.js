// context/GreetingContext.js
import React, { createContext, useContext, useState } from "react";
import { getUserGreetings, createGreeting } from "../services/greetingService";

// Create the context
const GreetingContext = createContext();

// Custom hook for using the context
export const useGreeting = () => useContext(GreetingContext);

// Greeting Provider Component
export const GreetingProvider = ({ children }) => {
  const [greetings, setGreetings] = useState([]); // State to store all greetings
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state

  // Fetch all greetings for a specific user
  const fetchGreetings = async (userId) => {
    setLoading(true);
    try {
      const data = await getUserGreetings(userId);
      setGreetings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new greeting
  const addGreeting = async (greetingData) => {
    setLoading(true);
    try {
      const newGreeting = await createGreeting(greetingData);
      setGreetings((prev) => [...prev, newGreeting]); // Add to the existing state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GreetingContext.Provider
      value={{
        greetings,
        loading,
        error,
        fetchGreetings,
        addGreeting,
      }}
    >
      {children}
    </GreetingContext.Provider>
  );
};
