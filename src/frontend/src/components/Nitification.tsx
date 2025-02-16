"use client";

import { useEffect } from "react";
import { useWebSocket } from "../hooks/webSocketContext";
import { toast } from "sonner";

export default function Notification() {
  const { messages } = useWebSocket();
  
  useEffect(() => {
    console.log("success");
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      toast.info(latestMessage.message);
    }
  }, [messages]);

  return null; 
}
