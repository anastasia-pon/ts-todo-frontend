import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteList } from '../modules/api';
import { AllListsContext } from '../context/AllListsContext';

import Error from '../components/Error';

const Home: React.FC = () => {
  const history = useHistory();
  const { lists, fetchLists, userData } = useContext(AllListsContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async (e: React.MouseEvent) => {
    const listId: string = (e.target as HTMLElement).id;
    const response = await deleteList(listId, userData[1]);
    if (!response.ok) {
      setError(true);
      return setErrorMessage('Could not delete');
    }
    return fetchLists();
  };
  return (
    <div className="main__container">
      {error && <Error setError={setError} errorMessage={errorMessage} />}
      <button
        className="btn btn-accent home__button"
        type="button"
        onClick={() => { history.push('/create'); }}
      >
        Create a List
      </button>
      <div className="lists">
        {!lists || lists.length === 0 ? <p className="message">There are no ToDo lists yet.</p> : lists.map((l) => (
          <article className="lists__card" id={l.listId} key={l.listId}>
            <div className="lists__card__container">
              <h2 className="lists__card__title">{l.title}</h2>
              <p className="lists__card__desc">{l.desc}</p>
              <div className="lists__card__btns">
                <button className="btn btn--grey" type="button" onClick={() => { history.push(`/list/${l.listId}`); }}>View</button>
                <button className="btn btn--grey" type="button" id={l.listId} onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
