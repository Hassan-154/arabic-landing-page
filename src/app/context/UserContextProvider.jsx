'use client'
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {

  const [language, setLanguage] = useState('ar');
  
  return (
    <UserContext.Provider value={{ language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
