import React, {useEffect, useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {UserProvider, UserContext} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  useEffect(() => {
    document.title = "RAY' AWESOME INVENTORY";
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <ProtectedRoute path='/search' component={SearchPage} />
          <ProtectedRoute path='/admin' component={AdminPage} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
