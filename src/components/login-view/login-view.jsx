import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// Redux
import { connect } from 'react-redux';

import './login-view.scss';
import Config from '../../config';

// react-bootstrap
import { Form, Button, Container, Col } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post(`${Config.API_URL}/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <React.Fragment>
      <Form className='login-form'>
        <h1 className='login-header'>myFlix Login</h1>
        <Form.Group controlId='loginUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='password'
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant='primary' type='submit'>
          Submit
        </Button>
        <Link to={`/register`}>
          <Button className='register-button' type='button' variant='warning'>
            Not Registered?
          </Button>
        </Link>
      </Form>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pasword: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  userLoginRequested: () => dispatch(userLoginRequested()),
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);