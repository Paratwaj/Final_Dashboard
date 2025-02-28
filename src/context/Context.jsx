import React, { useState, createContext, useEffect } from "react";

const MyContext = createContext();  // ✅ Creating the context

const MyProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

  return (
    <MyContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };  // ✅ Export both
