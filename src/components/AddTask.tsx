/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const AddTask = (props: {
  listId: string;
  parentId: string;
  handleAddTask: (task: BaseTask) => void,
  setAddingSubtask: (done: boolean) => void;
  addingSubtask: boolean;
}) => {
  const {
    listId, parentId, handleAddTask, addingSubtask, setAddingSubtask,
  } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState('other');
  const [deadline, setDeadline] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [cost, setCost] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);
  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value);
  const handleCarbsChange = (e: React.ChangeEvent<HTMLInputElement>) => setCarbs(e.target.value);
  const handleFatChange = (e: React.ChangeEvent<HTMLInputElement>) => setFat(e.target.value);
  const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtein(e.target.value);
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => setCost(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setAddingSubtask) {
      setAddingSubtask(false);
    }
    const newTask: BaseTask = {
      taskId: uuid(),
      parentId,
      listId,
      title,
      done: false,
      cost,
      type,
      deadline: type === 'work' ? deadline : '',
      carbs: type === 'food' ? carbs : '',
      fat: type === 'food' ? fat : '',
      protein: type === 'food' ? protein : '',
      tasks: [],
    };

    handleAddTask(newTask);
    setTitle('');
    setDeadline('');
    setCarbs('');
    setFat('');
    setProtein('');
    setCost('');
  };
  return (
    <form className={addingSubtask ? 'addtask addsub' : 'addtask'} id={listId} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} onKeyUp={(e) => e.stopPropagation()}>
      <label htmlFor="title">
        <input
          className="input__title"
          id="title"
          type="text"
          placeholder="Add a title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <label htmlFor="type">
        <input className="input__type" type="radio" value="work" name="type" onChange={handleTypeChange} />
        {' '}
        Work
        <input className="input__type" type="radio" value="food" name="type" onChange={handleTypeChange} />
        {' '}
        Food
        <input className="input__type" type="radio" value="other" name="type" onChange={handleTypeChange} defaultChecked />
        {' '}
        Other
      </label>
      {type === 'work' && (
        <label htmlFor="deadline">
          <input
            className="input__deadline"
            id="deadline"
            type="date"
            placeholder="Add a deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            required
          />
        </label>
      )}
      {type === 'food' && (
        <>
          <label htmlFor="carbs">
            <input
              className="input__carbs"
              id="carbs"
              type="number"
              pattern="^\d+$"
              value={carbs}
              onChange={handleCarbsChange}
              required
            />
            g/100g
          </label>
          <label htmlFor="fat">
            <input
              className="input__fat"
              id="fat"
              type="number"
              pattern="^\d+$"
              value={fat}
              onChange={handleFatChange}
              required
            />
            g/100g
          </label>
          <label htmlFor="protein">
            <input
              className="input__protein"
              id="protein"
              type="number"
              pattern="^\d+$"
              value={protein}
              onChange={handleProteinChange}
              required
            />
            g/100g
          </label>
        </>
      )}
      <label htmlFor="cost">
        <input
          className="input__cost"
          id="cost"
          type="number"
          pattern="^\d+$"
          placeholder="Add a cost"
          value={cost}
          onChange={handleCostChange}
        />
        SEK
      </label>
      <div className="addtask__btns">
        <button className="btn btn-accent" onClick={(e) => e.stopPropagation()} type="submit">Add a Task</button>
        {addingSubtask && <button className="btn btn-accent" onClick={(e) => { e.stopPropagation(); setAddingSubtask(false); }} type="submit">Cancel</button>}
      </div>
    </form>
  );
};

export default AddTask;
