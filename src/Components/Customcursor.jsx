// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import "./Customcursor.css";

// const CustomCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [hovered, setHovered] = useState(false);
//   const [clickEffects, setClickEffects] = useState([]);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       const interactiveElement = e.target.closest("button, a, input");
//       if (interactiveElement) {
//         const rect = interactiveElement.getBoundingClientRect();
//         setPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
//       } else {
//         setPosition({ x: e.clientX, y: e.clientY });
//       }
//     };

//     const handleMouseEnter = () => setHovered(true);
//     const handleMouseLeave = () => setHovered(false);

//     const handleClick = (e) => {
//       const effectId = Date.now();
//       setClickEffects((prev) => [...prev, { id: effectId, x: e.clientX, y: e.clientY }]);

//       setTimeout(() => {
//         setClickEffects((prev) => prev.filter((fx) => fx.id !== effectId));
//       }, 600);
//     };

//     window.addEventListener("mousemove", moveCursor);
//     window.addEventListener("click", handleClick);
//     document.querySelectorAll("button, a, input").forEach((el) => {
//       el.addEventListener("mouseenter", handleMouseEnter);
//       el.addEventListener("mouseleave", handleMouseLeave);
//     });

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("click", handleClick);
//       document.querySelectorAll("button, a, input").forEach((el) => {
//         el.removeEventListener("mouseenter", handleMouseEnter);
//         el.removeEventListener("mouseleave", handleMouseLeave);
//       });
//     };
//   }, []);

//   return (
//     <>
//       {/* Main Cursor */}
//       <motion.div
//         className="custom-cursor"
//         animate={{
//           x: position.x - 10,
//           y: position.y - 10,
//           scale: hovered ? 2 : 1,
//         }}
//         transition={{ type: "spring", stiffness: 200, damping: 20 }}
//       />

//       {/* Click Effects */}
//       {clickEffects.map((effect) => (
//         <motion.div
//           key={effect.id}
//           className="click-effect"
//           style={{ left: effect.x, top: effect.y }}
//           initial={{ scale: 0, opacity: 1 }}
//           animate={{ scale: 2, opacity: 0 }}
//           transition={{ duration: 0.6 }}
//         />
//       ))}
//     </>
//   );
// };

// export default CustomCursor;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
};

export default CustomCursor