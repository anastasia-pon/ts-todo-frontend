require('dotenv').config();

const baseUrl = process.env.REACT_APP_BASE_URL;

const createNewUser = (user: User) => fetch(`${baseUrl}api/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

const getAllLists = (userId: string, accessToken: string) => fetch(`${baseUrl}api/todos/get/all`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ userId }),
});

const createNewList = (list: BaseList, accessToken: string | undefined) => fetch(`${baseUrl}api/todos/create`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ list }),
});

const createNewTask = (newTask: BaseTask) => fetch(`${baseUrl}api/todos/task/create`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ newTask }),
});

const getList = (listId: string) => fetch(`${baseUrl}api/todos/get/one`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ listId }),
});

const updateTask = (updatedTask: BaseTask) => fetch(`${baseUrl}api/todos/task/update`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ updatedTask }),
});

const deleteTask = (taskId: string, parentId: string, listId: string) => fetch(`${baseUrl}api/todos/task/delete`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ taskId, parentId, listId }),
});

const deleteList = (listId: string, accessToken: string | undefined) => fetch(`${baseUrl}api/todos/delete`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ listId }),
});

export {
  createNewUser,
  getAllLists,
  createNewList,
  getList,
  createNewTask,
  updateTask,
  deleteTask,
  deleteList,
};
