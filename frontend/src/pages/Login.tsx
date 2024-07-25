import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'src/pages/Login.css';
import { useUserContext } from 'src/contexts/UserContext';

import * as UserApi from 'src/network/user_api';
import { ConflictError, UnauthorizedError } from 'src/errors/http_errors';

import { GoAlert } from 'react-icons/go';

const ChangeFormType: React.FC<{ isSigningUp: boolean }> = ({ isSigningUp }) => {
  const navigate = useNavigate();

  return (
    isSigningUp
      ? (
        <div onClick={() => navigate('/login', { state: { isSigningUp: false } })} className="swapText">
          {'Already have an account? '}
          <span>Click here to login.</span>
        </div>
      )
      : (
        <div onClick={() => navigate('/login', { state: { isSigningUp: true } })} className="swapText">
          {'Don\'t have an account? '}
          <span>Click here to sign up.</span>
        </div>
      )
  );
};

const Login = () => {
  const { onLoginSuccessful } = useUserContext();
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();
  const { isSigningUp } = state;

  async function onSubmit(event: any) {
    event.preventDefault();
    const lowercaseEmail = email.toLowerCase();

    try {
      setSubmitting(true)
      let user;
      if (isSigningUp) {
        const credentials: UserApi.SignUpCredentials = { name, email: lowercaseEmail, password };
        user = await UserApi.signup(credentials);
      } else {
        const credentials: UserApi.LoginCredentials = { email: lowercaseEmail, password };
        user = await UserApi.login(credentials);
      }

      onLoginSuccessful(user);
      navigate(`/${isSigningUp ? 'account' : ''}`);
    } catch (error) {
      setSubmitting(false)
      if (error instanceof UnauthorizedError || error instanceof ConflictError) {
        setErrorText(error.message);
      }
      console.error(error);
    }
  }

  return (
    <div className="formContainer">
      <div className="topText">{isSigningUp ? 'Sign Up' : 'Log In'}</div>
      {errorText && (<p className="errorText">
        <div>
          <GoAlert />{' '}{errorText}
        </div>
      </p>)}
      <form onSubmit={onSubmit}>
        {isSigningUp
          && (
            <input
              placeholder="Name*"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          )}
        <input
          placeholder="Email*"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          placeholder="Password*"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="primaryButtonAlt" type="submit">{
          submitting
            ? 'Submitting...'
            : isSigningUp
              ? 'Create Account' : 'Log In'}</button>
      </form>
      <ChangeFormType isSigningUp={isSigningUp} />
    </div>
  );
}

export default Login;
