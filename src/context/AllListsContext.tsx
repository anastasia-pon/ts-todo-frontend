/* eslint-disable max-len */
import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { getAllLists } from '../modules/api';

const AllListsContextDefault: AllListsContextState = {
  lists: [],
  userData: [],
  fetchLists: () => {},
};

export const AllListsContext = createContext<AllListsContextState>(AllListsContextDefault);

export const AllListsProvider: React.FC = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userData, setUserData] = useState<string[]>(AllListsContextDefault.userData!);
  const [lists, setLists] = useState<ListState[]>(AllListsContextDefault.lists);
  const fetchLists = async () => {
    const response = await getAllLists(userData![0], userData![1]);
    if (response.ok) {
      const allLists = await response.json();
      setLists(allLists);
    }
  };
  useEffect(() => (authState.isAuthenticated ? setUserData([authState.accessToken!.claims.uid, authState.accessToken!.accessToken]) : setUserData([])), [authState, oktaAuth]);

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
