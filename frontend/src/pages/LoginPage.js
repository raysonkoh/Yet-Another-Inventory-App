import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import customAxios from '../helpers/customAxios';
import {UserContext} from '../contexts/UserContext';

function LoginPage(props) {
  const [user, customSetUser] = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(false);
  const [tokenLocal, setTokenLocal] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (tokenLocal !== null) {
      customAxios
        .post('auth/verify', {
          headers: {'Content-Type': 'application/json'},
          data: {
            token: tokenLocal,
          },
        })
        .then(res => {
          if (res.status === 200) {
              customSetUser(res.data.token, res.data.name, res.data.email);
              setIsVerified(true);
          } 
        })
        .catch(err => console.log(err));
    }
  }, [tokenLocal]);

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
          const {token, name, email, inventoryId} = res.data;
          customSetUser(token, name, email, inventoryId);
          console.log('login success');
          history.push('/dashboard');
        } else {
          console.log('login failed');
        }
      })
      .catch(err => console.log(err));
  };

  return isVerified ? (
    <Redirect to="/dashboard" />
  ) : (
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
