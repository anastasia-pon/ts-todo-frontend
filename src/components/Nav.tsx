import * as React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Nav = () => {
  const { authState, oktaAuth } = useOktaAuth();

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Reminders App</h1>
        <nav className="header__nav">
          {authState.isAuthenticated && (
            <>
              <a className="nav__item" href="/">Home</a>
              <button className="nav__item" type="button" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
