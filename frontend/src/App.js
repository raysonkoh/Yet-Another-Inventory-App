import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoutes from './components/ProtectedRoutes';
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
          <ProtectedRoutes>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/admin" component={AdminPage} />
          </ProtectedRoutes>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
