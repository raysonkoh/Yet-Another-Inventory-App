import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

function ProtectedRoutes(props) {
  const [user, customSetUser] = useContext(UserContext);
    console.log(user);
  
    return user.token ? props.children : <Redirect to='/' />;
}

export default ProtectedRoutes;
