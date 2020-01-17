import React, {useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  useEffect(() => {
    document.title = "RAY' AWESOME INVENTORY";
  }, []);
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token ? (
        <Route exact path="/" component={Dashboard} />
      ) : (
        <Route exact path="/" component={LoginPage} />
      )}
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/admin" component={AdminPage} />
    </BrowserRouter>
  );
}

export default App;
