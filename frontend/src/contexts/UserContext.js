import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
  });

  const customSetUser = (token, name, email) => {
    localStorage.setItem('token', token);
    const newUser = {
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
