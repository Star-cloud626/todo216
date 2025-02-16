import { kafka } from './index'
import WebSocket, { WebSocketServer } from 'ws';

const topic = process.env.TOPICS
const app = process.env.APP_NAME

export const consumer = async (): Promise<void> => {

  const wss = new WebSocketServer({ port: 5555 });
  let clients: Set<WebSocket> = new Set();

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");
    clients.add(ws);

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clients.delete(ws);
    });
  });


  const consumer = kafka.consumer({ groupId: `${app}` })

  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, message, partition }) => {
      if (topic == "real") {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log("open",message.value.toString());
            try{
              client.send(message.value.toString());
            }catch(err){
              console.log(err,'err');
            }
          }
        });
      }
    },
  })
}
