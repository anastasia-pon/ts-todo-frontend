/* eslint-disable max-len */
import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useList from '../modules/useList';

import Error from '../components/Error';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

const List: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    fullList,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    guests,
    error,
    setError,
    errorMessage,
  } = useList(roomId);
  const history = useHistory();

  if (!roomId) {
    history.push('/');
    return null;
  }

  if (!fullList || Object.keys(fullList.list).length === 0) {
    return <p>List does not exist.</p>;
  }
  return (
    <div className="main__container">
      {error && <Error setError={setError} errorMessage={errorMessage} />}
      <div className="list__guests">
        {guests.length > 0 && guests.map((g) => (
          <p key={g.id}>
            {g.name}
            {' '}
            is here!
          </p>
        ))}
      </div>
      {fullList && Object.keys(fullList.list).length > 0 && (
        <div className="list__container" id={fullList.list.listId}>
          <h2>{fullList.list.title}</h2>
          <p className="list__container__desc">{fullList.list.desc}</p>
          <AddTask
            setAddingSubtask={() => {}}
            addingSubtask={false}
            listId={fullList.list.listId}
            parentId={fullList.list.listId}
            handleAddTask={handleAddTask}
          />
          <div className="tasks__container">
            {fullList.tasks.map((t: BaseTask) => t.parentId === fullList.list.listId && (
              <Task
                tasks={fullList.tasks}
                task={t}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                handleAddTask={handleAddTask}
                key={t.taskId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
