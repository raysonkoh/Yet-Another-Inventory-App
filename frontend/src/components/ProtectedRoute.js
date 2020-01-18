import React, {useState, useContext, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {Spin} from 'antd';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';
import customAxios from '../helpers/customAxios';

function ProtectedRoute(props) {
  const [user, customSetUser, resetUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user.token === null && token !== null) {
      customAxios
        .post('/auth/verify', {
          headers: {'Content-Type': 'application/json'},
          data: {
            token,
          },
        })
        .then(res => {
          if (res.status === 200) {
            customSetUser(
              res.data.token,
              res.data.name,
              res.data.email,
              res.data.inventoryId,
            );
          } else {
            resetUser();
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          resetUser();
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    (isLoading && <Spin size="large" />) ||
    (user.token && (
      <Route exact path={props.path} component={props.component} />
    )) || <Redirect to="/" />
  );
}

export default ProtectedRoute;
