import React, {createContext, useEffect, useState} from 'react';
import customAxios from '../helpers/customAxios';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    token: null,
    name: null,
    email: null,
    inventoryId: null,
  });

  const customSetUser = (token, name, email, inventoryId) => {
    localStorage.setItem('token', token);
    const newUser = {
      token,
      inventoryId,
      name,
      email,
    };
    setUser(newUser);
  };

  const resetUser = () => {
    localStorage.removeItem('token');
    const newUser = {
      token: null,
      name: null,
      email: null,
      inventoryId: null,
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={[user, customSetUser, resetUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
