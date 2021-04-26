/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { getAllLists } from '../modules/api';

const AllListsContextDefault: AllListsContextState = {
  lists: [],
  userData: [],
  fetchLists: () => {},
};

interface AllListsProviderProps {
  children?: JSX.Element|JSX.Element[];
}

export const AllListsContext = createContext(AllListsContextDefault);

export const AllListsProvider = ({ children }: AllListsProviderProps) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userData, setUserData] = useState(AllListsContextDefault.userData);
  const [lists, setLists] = useState(AllListsContextDefault.lists);
  const fetchLists = async () => {
    const response = await getAllLists(userData[0], userData[1]);
    if (response.ok) {
      const allLists = await response.json();
      setLists(allLists);
    }
  };
  useEffect(() => (authState.isAuthenticated && authState.accessToken ? setUserData([authState.accessToken.claims.uid, authState.accessToken.accessToken]) : setUserData([])), [authState, oktaAuth]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchLists();
    }
  }, [userData]);

  return (
    <AllListsContext.Provider value={{ userData, lists, fetchLists }}>
      {children}
    </AllListsContext.Provider>
  );
};
