import React, {useContext} from 'react';
import {Spin} from 'antd';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

function ProtectedRoutes(props) {
  const [user, customSetUser] = useContext(UserContext);

  return (
    (user.verified && props.children) ||
    (user.verified === null && <Spin size="large" />) ||
    (!user.verified && <Redirect to="/" />)
  );
}

export default ProtectedRoutes;
