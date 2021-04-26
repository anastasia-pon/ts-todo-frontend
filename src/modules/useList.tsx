import {
  useEffect, useRef, useState,
} from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8000';

const useList = (roomId: string) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fullList, setFullList] = useState<FullListState>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const socketRef = useRef<any>();

  const handleAddTask = (newTask: BaseTask) => {
    socketRef.current.emit('task:add', newTask);
  };

  const handleUpdateTask = (updatedTask: BaseTask) => {
    socketRef.current.emit('task:update', updatedTask);
  };

  const handleDeleteTask = (taskId: string, parentId: string, listId: string) => {
    socketRef.current.emit('task:delete', taskId, parentId, listId);
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
        const currentGuests = participants.filter((p) => p.id !== socketRef.current.id);
        setGuests(currentGuests);
      }
    });

    return () => socketRef.current.disconnect();
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
