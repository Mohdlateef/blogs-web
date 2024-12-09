import React, { useContext } from "react";

import userContext from "../context/userIdContext";
export default function Notifications() {
  const { isVisible, setIsVisible, message }: any = useContext(userContext);
  if (isVisible) {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }

  return isVisible ? (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-black px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4">
  
     
    <span className="text-sm font-medium">{message}</span>
    
  </div>
  ) : (
    ""
  );
}
