'use client';

import React from 'react';
import { WebSocketProvider } from '@/hooks/webSocketContext';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <WebSocketProvider>{children}</WebSocketProvider>;
};

export default ClientLayout;