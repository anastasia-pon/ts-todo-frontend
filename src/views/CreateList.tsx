/* eslint-disable max-len */
import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { AllListsContext } from '../context/AllListsContext';
import { createNewList } from '../modules/api';
import Error from '../components/Error';

const CreateList: React.FC = () => {
  const history = useHistory();
  const { userData, fetchLists } = useContext(AllListsContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newList: BaseList = {
      title,
      desc,
      userId: userData[0],
      listId: uuid(),
    };
    const response = await createNewList(newList, userData[1]);
    if (!response.ok) {
      setError(true);
      return setErrorMessage('Could not save. Please, try again.');
    }
    await response.json();
    fetchLists();
    return history.push(`/list/${newList.listId}`);
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Create a ToDo list</h2>
      <label htmlFor="title">
        <input
          className="create__title"
          id="title"
          type="text"
          value={title}
          placeholder="Add a title *"
          onChange={handleTitleChange}
          required
        />
      </label>
      <label htmlFor="desc">
        <textarea
          className="create__desc"
          id="desc"
          value={desc}
          placeholder="Add a description *"
          onChange={handleDescriptionChange}
          required
        />
      </label>
      <p>Fields marked with * are required</p>
      <button className="btn btn-accent" type="submit">Create</button>
      {error && <Error setError={setError} errorMessage={errorMessage} />}
    </form>
  );
};

export default CreateList;
