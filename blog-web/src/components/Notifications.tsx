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
    <div className="fixed top-1 left-1/2 bg-orange-300 p-3 rounded px-9">
      {message}
    </div>
  ) : (
    ""
  );
}
