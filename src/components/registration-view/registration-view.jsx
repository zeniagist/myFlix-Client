import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Form, Button, Container } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://myflix-zag.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthdate
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // '_self' is necessary so the page will open in the current tab
        alert('You may now log in');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <React.Fragment>
      <Form className='register-form'>
        <h1 className='register-header'>Welcome to myFlix!</h1>
        {/* <h2 className="register-subheader">If you already have a login please click here</h2> */}
        <Form.Group controlId='formBasicText'>
          <Form.Label size='lg'>Username</Form.Label>
          <Form.Control
            type='text'
            size='lg'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter usename'
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label size='lg'>Email</Form.Label>
          <Form.Control
            type='email'
            size='lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label size='lg'>Password</Form.Label>
          <Form.Control
            type='password'
            size='lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter new password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label size='lg'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            size='lg'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicDate'>
          <Form.Label size='lg'>Birthdate</Form.Label>
          <Form.Control
            type='date'
            size='lg'
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder='Enter your birthdate'
          />
        </Form.Group>
        <Button type='button' variant='dark' onClick={handleRegister}>Submit</Button>
        <Link to={`/register`}>
          <Button type='button' variant='info'>Not Registered?</Button>
        </Link>
      </Form>
    </React.Fragment>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func,
};
