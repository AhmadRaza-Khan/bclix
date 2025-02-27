"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown2, setIsDropdown2] = useState(false);
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedUserEmail = localStorage.getItem("userEmail");
    const savedTheme = localStorage.getItem("theme");

    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }
    if (savedUserEmail) {
      setUserEmail(savedUserEmail);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (user && userEmail) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", userEmail);
    }
    if (theme) {
      localStorage.setItem("theme", theme); 
    }
  }, [user, userEmail, theme]); 

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const admin = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const login = (userInfo, userEmail) => {
    console.log("Login attempt:", userInfo);
    if (userInfo && userEmail) {
      
      setUser(userInfo);
      setUserEmail(userEmail);
      setIsLoggedIn(true);
      if(userEmail == admin){
        setShow(true)
      } else {
        setShow(false)
      }
    } else {
      console.log("Invalid user info or userEmail");
    }
  };

  const logout = () => {
    setShow(false)
    setUser(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
  };

  const value = {
    show,
    theme,
    toggleTheme,
    user,
    setUser,
    userEmail,
    setUserEmail,
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
