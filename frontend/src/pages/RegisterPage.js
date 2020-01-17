import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import customAxios from '../helpers/customAxios';

function RegisterPage(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = e => {
    customAxios
      .post('auth/register', {
        headers: {'Content-Type': 'application/json'},
        data: {
          name,
          email,
          password,
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log('register success');
          props.history.push('/');
        } else {
          console.log('register failed');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Form style={{padding: '10em'}}>
      <Form.Item label="Name" required="true">
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
          placeholder="your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Form.Item>
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
          onClick={submitRegister}>
          Register
        </Button>
        Or
        <Button type="normal" style={{marginLeft: '1em'}}>
          <Link to="/">Go Back to Login</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegisterPage;
