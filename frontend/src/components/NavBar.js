import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button, Menu, Icon} from 'antd';

function NavBar(props) {
    const history = useHistory();
  const [current, setCurrent] = useState('mail');

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const onLogout = e => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="dashboard">
        <Link to="/">
          <Icon type="dashboard" />
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="search">
        <Link to="/search">
          <Icon type="search" />
          Search
        </Link>
      </Menu.Item>
      <Menu.Item key="admin">
        <Link to="/admin">
          <Icon type="setting" />
          Admin
        </Link>
      </Menu.Item>
      <Button
        size="large"
        icon="logout"
        style={{float: 'right'}}
        onClick={onLogout}>
        Logout
      </Button>
    </Menu>
  );
}

export default NavBar;
