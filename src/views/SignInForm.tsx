import * as React from 'react';
import { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const SignInForm: React.FC = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: Credentials = {
      username: email,
      password,
    };
    oktaAuth.signInWithCredentials(credentials)
      .then((res) => {
        setSessionToken(res.sessionToken);
        oktaAuth.signInWithRedirect({ sessionToken: res.sessionToken });
      })
      .catch((err) => console.log('Found an error', err));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    return null;
  }

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <label htmlFor="email">
        <input
          className="signin__email"
          id="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleUsernameChange}
        />
      </label>
      <label htmlFor="password">
        <input
          className="signin__pass"
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </label>
      <input className="btn btn-accent" id="submit" type="submit" value="Sign In" />
      <a className="link" href="/signup">Don&apos;t have an account?</a>
    </form>
  );
};

export default SignInForm;
