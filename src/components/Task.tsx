/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import { useState } from 'react';
import AddTask from './AddTask';

const Task = (props: {
  tasks: BaseTask[];
  task: BaseTask;
  handleUpdateTask: (task: BaseTask) => void;
  handleDeleteTask: (taskId: string, parentId: string, listId: string) => void;
  handleAddTask: (task: BaseTask) => void,
}) => {
  const {
    task, handleUpdateTask, handleDeleteTask, handleAddTask, tasks,
  } = props;

  if (!task) {
    return null;
  }

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [type, setType] = useState(task.type);
  const [done, setDone] = useState(task.done);
  const [deadline, setDeadline] = useState(task.deadline);
  const [carbs, setCarbs] = useState(task.carbs);
  const [fat, setFat] = useState(task.fat);
  const [protein, setProtein] = useState(task.protein);
  const [cost, setCost] = useState(task.cost);
  const [addingSubtask, setAddingSubtask] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);
  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value);
  const handleCarbsChange = (e: React.ChangeEvent<HTMLInputElement>) => setCarbs(e.target.value);
  const handleFatChange = (e: React.ChangeEvent<HTMLInputElement>) => setFat(e.target.value);
  const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtein(e.target.value);
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => setCost(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    setAddingSubtask(false);
    const updatedTask: BaseTask = {
      taskId: task.taskId,
      parentId: task.parentId,
      listId: task.listId,
      title,
      done,
      cost,
      type,
      deadline: type === 'work' ? deadline : '',
      carbs: type === 'food' ? carbs : '',
      fat: type === 'food' ? fat : '',
      protein: type === 'food' ? protein : '',
      tasks: task.tasks,
    };
    handleUpdateTask(updatedTask);
  };

  const handleTaskToggle = () => {
    setDone(!done);
    const updatedTask: BaseTask = {
      taskId: task.taskId,
      parentId: task.parentId,
      listId: task.listId,
      title,
      done: !done,
      cost,
      type,
      deadline: type === 'work' ? deadline : '',
      carbs: type === 'food' ? carbs : '',
      fat: type === 'food' ? fat : '',
      protein: type === 'food' ? protein : '',
      tasks: task.tasks,
    };
    handleUpdateTask(updatedTask);
  };
  return (
    <article className={done ? `task ${task.type} task--done` : `task ${task.type}`} onClick={(e) => { e.stopPropagation(); handleTaskToggle(); }} onKeyUp={(e) => (e.key === 'Enter' ? handleTaskToggle() : null)}>
      {editing ? (
        <form className="edittask" id={task.taskId} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} onKeyUp={(e) => e.stopPropagation()}>
          <label htmlFor="title">
            <input
              className="input__title"
              id="title"
              type="text"
              placeholder="Add a title"
              value={title}
              onChange={handleTitleChange}
              onClick={(e) => e.stopPropagation()}
              required
            />
          </label>
          <label htmlFor="type">
            <input className="input__type" type="radio" value="work" name="type" onChange={handleTypeChange} defaultChecked={type === 'work'} />
            {' '}
            Work
            <input className="input__type" type="radio" value="food" name="type" onChange={handleTypeChange} defaultChecked={type === 'food'} />
            {' '}
            Food
            <input className="input__type" type="radio" value="other" name="type" onChange={handleTypeChange} defaultChecked={type === 'other'} />
            {' '}
            Other
          </label>
          {type === 'work' && (
            <label htmlFor="deadline">
              <input
                className="input__deadline"
                id="deadline"
                type="date"
                value={deadline}
                onChange={handleDeadlineChange}
                onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            />
            {' '}
            SEK
          </label>
          <div className="edit__btns">
            <button onClick={(e) => e.stopPropagation()} className="btn btn--grey" type="submit">Save</button>
            <button className="btn btn--grey" type="button" onClick={(e) => { e.stopPropagation; setEditing(false); }}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="task__container">
          <div className="task__title">{task.title}</div>
          {task.cost && (
            <p className="task__cost">
              Cost:
              {' '}
              {task.cost}
              {' '}
              SEK
            </p>
          )}
          {task.type === 'work' && (
            <p className="task__deadline">
              Deadline:
              {' '}
              {task.deadline}
            </p>
          )}
          {task.type === 'food' && (
            <p className="task__food">
              Carbs:
              {' '}
              {task.carbs}
              {' '}
              g/100g
              {' '}
              Fat:
              {' '}
              {task.fat}
              {' '}
              g/100g
              {' '}
              Protein:
              {' '}
              {task.protein}
              {' '}
              g/100g
            </p>
          )}
          <button className="btn btn--grey" type="button" onClick={(e) => { e.stopPropagation(); setEditing(true); }}>Edit</button>
          <button className="btn btn--grey btn--delete" type="button" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.taskId, task.parentId, task.listId); }}>Delete</button>
          <button className="btn btn--grey" type="button" onClick={(e) => { e.stopPropagation(); setAddingSubtask(true); }}>Add Subtask</button>
        </div>
      )}
      {addingSubtask && <AddTask addingSubtask={addingSubtask} setAddingSubtask={setAddingSubtask} listId={task.listId} parentId={task.taskId} handleAddTask={handleAddTask} />}
      {task.tasks.length > 0 && task.tasks.map((s) => {
        const subTask: BaseTask[] = tasks.filter((t: BaseTask) => t.taskId === s);
        return (
          <div className="subtasks" key={subTask[0].taskId}>
            <Task
              tasks={tasks}
              task={subTask[0]}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
              handleAddTask={handleAddTask}
            />
          </div>
        );
      })}
    </article>
  );
};

export default Task;
