import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
    inventoryId: null,
  });

  const customSetUser = (token, name, email, inventoryId) => {
    localStorage.setItem('token', token);
    const newUser = {
      inventoryId,
      name,
      email,
      token,
    };

    setUser(newUser);
  };

  return (
    <UserContext.Provider value={[user, customSetUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
