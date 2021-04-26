/* eslint-disable max-len */
/* eslint-disable consistent-return */
import * as React from 'react';
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { createNewUser } from '../modules/api';
import Error from '../components/Error';

const SignUp: React.FC = () => {
  const { oktaAuth } = useOktaAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPasswords, setMatchPasswords] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatchPasswords(false);
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await createNewUser(newUser);
      if (!response.ok) {
        setError(true);
        return setErrorMessage('Registration failed');
      }
      try {
        const transaction = await oktaAuth.signIn({
          username: newUser.email,
          password: newUser.password,
        });
        if (transaction.status === 'SUCCESS') {
          oktaAuth.signInWithRedirect({
            originalUri: '/',
            sessionToken: transaction.sessionToken,
          });
          setError(false);
        } else {
          setError(true);
          setErrorMessage('Login failed');
        }
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="firstName">
        <input
          className="signup__first"
          id="firstName"
          placeholder="First name *"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </label>
      <label htmlFor="lastName">
        <input
          className="signup__last"
          id="lastName"
          type="text"
          placeholder="Last name *"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </label>
      <label htmlFor="email">
        <input
          className="signup__email"
          id="email"
          type="text"
          value={email}
          placeholder="Email *"
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password">
        <input
          className="signup__pass"
          id="password"
          type="password"
          placeholder="Password *"
          value={password}
          pattern="^.{8,}$"
          onChange={handlePasswordChange}
          required
        />
      </label>
      <p className="signup__message">Must be at least 8 characters long</p>
      <label htmlFor="confirmPassword">
        <input
          className="signup__conf"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password *"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </label>
      <p className="signup__message">Fields marked with * are required</p>
      {!matchPasswords && <p>Passwords do not match</p>}
      <button className="btn btn-accent signup__btn" id="submit" type="submit">Sign Up</button>
      {error && <Error setError={setError} errorMessage={errorMessage} />}
      <a className="link" href="/login">Already have an account?</a>
    </form>
  );
};
export default SignUp;
