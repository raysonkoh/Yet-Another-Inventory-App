import React, {createContext, useEffect, useState} from 'react';
import customAxios from '../helpers/customAxios';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
    inventoryId: null,
    verified: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user.token && token !== null) {
      customAxios
        .post('auth/verify', {
          headers: {'Content-Type': 'application/json'},
          data: {
            token,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setUser({
              token: res.data.token,
              name: res.data.name,
              email: res.data.email,
              inventoryId: res.data.inventoryId,
              verified: true,
            });
          } else {
            setUser({
              token: res.data.token,
              name: res.data.name,
              email: res.data.email,
              inventoryId: res.data.inventoryId,
              verified: false,
            });
          }
        })
        .catch(err => console.log(err));
    }
  }, [user.token]);

  const customSetUser = (token, name, email, inventoryId, verified) => {
    localStorage.setItem('token', token);
    const newUser = {
      inventoryId,
      name,
      email,
      token,
      verified,
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={[user, customSetUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
