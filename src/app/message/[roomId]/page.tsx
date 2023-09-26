"use client";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Card,
  Box,
  IconButton,
  useTheme,
  TextField,
  List,
} from "@mui/material";
import {
  MessageBox,
  MessageList,
  Input,
  MessageType,
} from "react-chat-elements";
import { SendOutlined } from "@mui/icons-material";
import { io, Socket } from "socket.io-client";
import MessageBubble, { BubbleProps } from "@/components/chats/Bubble";
import MessageDisplay from "@/components/chats/MessageDisplay";
import Room from "@/models/Rooms";
import MessageRoom from "@/components/chats/Room";

const SERVER_URL = "http://127.0.0.1:3000/api/"; // Replace with your server's URL

interface RoomType {
  roomId: string;
  recipientId: string;
  username: string;
  lastMessage: string;
  numberOfUnreadMessages: number;
  avatar: string;
  date: string | Date;
}

const dummyData: RoomType[] = [
  {
    roomId: "1",
    recipientId: "user1",
    username: "John Doe",
    lastMessage: "Hello there!",
    numberOfUnreadMessages: 2,
    avatar: "https://picsum.photos/200/200", // Avatar URL with HTTPS
    date: "2023-09-23",
  },
  {
    roomId: "2",
    recipientId: "user2",
    username: "Alice Smith",
    lastMessage: "Hi John, how are you?",
    numberOfUnreadMessages: 0,
    avatar: "https://picsum.photos/200/200", // Avatar URL with HTTPS
    date: "2023-09-22",
  },
  {
    roomId: "3",
    recipientId: "user3",
    username: "Bob Johnson",
    lastMessage: "Meeting at 2 PM.",
    numberOfUnreadMessages: 1,
    avatar: "https://picsum.photos/200/200", // Avatar URL with HTTPS
    date: "2023-09-21",
  },
  // ... (other data entries)
];

const ChatScreen: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [rooms, setRooms] = useState<RoomType[]>(dummyData);

  let ref = React.useRef(null);

  const theme = useTheme();

  useEffect(() => {
    // Connect to the socket.io server
    const socketIo = io(SERVER_URL);
    setSocket(socketIo);

    // Clean up on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);
  return (
    <main
      style={{ paddingTop: "10vh", gap: 5, justifyContent: "center" }}
      className="min-h-screen grid grid-cols-dashboard md:px-40"
    >
      <Box className="w-full sticky top-[10vh] mx5 md:w-[30vw]">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {rooms.map((room) => {
            return (
              <MessageRoom
                handleClick={(roomId) => setActiveRoom(roomId)}
                key={room.roomId}
                {...room}
              />
            );
          })}
        </List>
      </Box>
      {activeRoom && socket && (
        <MessageDisplay socket={socket} roomId={activeRoom} />
      )}
      {!activeRoom && (
        <Box>
          <Typography>No Chat Selected</Typography>
        </Box>
      )}
    </main>
  );
};

export default ChatScreen;
