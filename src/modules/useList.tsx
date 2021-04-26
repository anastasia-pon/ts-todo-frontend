import {
  useEffect, useRef, useState,
} from 'react';
import socketIOClient from 'socket.io-client';
const SOCKET_SERVER_URL = 'http://localhost:8000';

type UseListProps = (roomId: string) => {
  fullList?: FullListState,
  handleAddTask: (task: BaseTask) => void,
  handleUpdateTask: (task: BaseTask) => void;
  handleDeleteTask: (taskId: string, parentId: string, listId: string) => void;
  guests: Guest[];
  error: boolean;
  setError: (err: boolean) => void;
  errorMessage: string;
}

const useList:  UseListProps = (roomId: string) => {
  const [guests, setGuests] = useState([]);
  const [fullList, setFullList] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const socketRef = useRef();

  const handleAddTask = (newTask: BaseTask) => {
    if (socketRef.current) {
      socketRef.current.emit('task:add', newTask);
    }
  };

  const handleUpdateTask = (updatedTask: BaseTask) => {
    if (socketRef.current) {
      socketRef.current.emit('task:update', updatedTask);
    }
  };

  const handleDeleteTask = (taskId: string, parentId: string, listId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('task:delete', taskId, parentId, listId);
    }
  };

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    if (!fullList) {
      socketRef.current.emit('join', roomId);
    }

    socketRef.current.on('error', (err: string) => {
      setError(true);
      setErrorMessage(err);
    });

    socketRef.current.on('list:send', (list: FullListState) => {
      setFullList(list);
    });

    socketRef.current.on('participants:all', (participants: Guest[]) => {
      if (participants.length > 0) {
        const currentGuests = participants.filter((p) => p.id !== socketRef.current!.id);
        setGuests(currentGuests);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    }
  }, [roomId]);

  return {
    fullList,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    guests,
    error,
    setError,
    errorMessage,
  };
};

export default useList;
