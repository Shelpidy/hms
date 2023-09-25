import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

const server = new Server();

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.send(server);
}
