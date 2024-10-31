import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { backendUrl } from './constants';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(backendUrl, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
