"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown2, setIsDropdown2] = useState(false);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");  // Add userId state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  // Load user, userId, and theme data from localStorage on initial load
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedUserId = localStorage.getItem("userId");  // Retrieve userId
    const savedTheme = localStorage.getItem("theme");

    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }
    if (savedUserId) {
      setUserId(savedUserId);  // Set userId if available
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Listen for changes in user, userId, and theme to persist them to localStorage
  useEffect(() => {
    if (user && userId) {
      localStorage.setItem("user", JSON.stringify(user));  // Persist user info
      localStorage.setItem("userId", userId);  // Persist userId
    }
    if (theme) {
      localStorage.setItem("theme", theme);  // Persist theme
    }
  }, [user, userId, theme]);  // Make sure to include userId

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsDropdown2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside2);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Login functionality to store user and userId
  const login = (userInfo, userId) => {
    console.log("Login attempt:", userInfo);  // Debugging log
    if (userInfo && userId) {
      setUser(userInfo);
      setUserId(userId);  // Store userId
      setIsLoggedIn(true);
    } else {
      console.log("Invalid user info or userId");
    }
  };

  // Logout functionality to clear user and userId data
  const logout = () => {
    setUser(null);
    setUserId(null);  // Clear userId
    setIsLoggedIn(false);
    localStorage.removeItem("user");  // Clear user info from localStorage
    localStorage.removeItem("userId");  // Clear userId from localStorage
  };

  const value = {
    theme,
    toggleTheme,
    user,
    setUser,
    userId,  // Provide userId in context
    setUserId,  // Allow updating userId
    isLoggedIn,
    login,
    logout,
    isDropdownOpen,
    isDropdown2,
    setIsDropdownOpen,
    setIsDropdown2,
    dropdownRef,
    dropdownRef2,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to access the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
