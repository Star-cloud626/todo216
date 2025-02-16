'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { toast } from "sonner";

interface WebSocketMessage {
  message: string;
}

interface WebSocketContextType {
  messages: WebSocketMessage[];
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  // const { messages } = useWebSocket();
  console.log("messages",messages);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5555");
    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log(event,"event");
      const data: WebSocketMessage = event.data;
      console.log("Received WebSocket message:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting...");
      setIsConnected(false);
      setTimeout(() => {
        wsRef.current = new WebSocket("ws://localhost:5555");
      }, 5000);
    };

    wsRef.current = socket;
    

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      toast.info(latestMessage,{
        style: { fontSize: '1rem', padding: '20px' },
        position: 'top-right',
      });
    }
  }, [messages]);

  return (
    <WebSocketContext.Provider value={{ messages, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
