import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import SignInForm from '../views/SignInForm';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div className="loader">Loading...</div>;
  }
  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }} />
    : <SignInForm />;
};

export default SignIn;
