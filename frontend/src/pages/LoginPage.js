import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import customAxios from '../helpers/customAxios';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = e => {
    customAxios
      .post('auth/login', {
        headers: {'Content-Type': 'application/json'},
        data: {
          email,
          password,
        },
      })
      .then(res => {
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem('token', token)
          console.log('login success');
            window.location.reload();
        } else {
          console.log('login failed');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Form style={{padding: '15em'}}>
      <Form.Item label="Email" required="true">
        <Input
          prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Password" required="true">
        <Input
          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{marginRight: '2em'}}
          onClick={submitLogin}>
          Log in
        </Button>
        Or{' '}
        <Button type="normal">
          <Link to="/register">Register Now!</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
