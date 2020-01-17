import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

function NavBar(props) {
  const [current, setCurrent] = useState('mail');

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
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
    </Menu>
  );
}

export default NavBar;
