// import { useState,useRef } from "react";
import React, { createContext, useState, useEffect } from 'react';

import userContext from "./userIdContext";






const UserProvider = (props: any) => {

  const storedUserId = localStorage.getItem('userId');
  const [userId, setUserId] = useState<any>(storedUserId ? (storedUserId) : '');

console.log(userId,"15");
  useEffect(() => {
  
      localStorage.setItem('userId', userId);
    
  }, [userId]); 

  return (
    <userContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;