"use client";
import MessageBubble, { BubbleProps } from "@/components/chats/Bubble";
import { SendOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    IconButton,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SERVER_URL = "http://127.0.0.1:3000/api/"; // Replace with your server's URL

const dummyMessages: BubbleProps[] = [
  {
    userId: "sjsjsjwpefniw44i2fin",
    messageId: "sjsjsjwpefniw44i2fin",
    avatar: "https://picsum.photos/200/300",
    alignment: "left",
    username: "Alberta",
    message: "Hello, how can I help you?",
    date: new Date(),
  },
  {
    userId: "sjsjsjuupefniw44i2fin",
    messageId: "sjsjsjuupefniw44i2fin",
    avatar: "https://picsum.photos/200/300",
    alignment: "left",
    username: "Alberta",
    message:
      "I have been asking you for the past three hours and you have not responed yet?",
    date: new Date(),
  },
  {
    userId: "sjsjsjuupeftyniw44i2fin",
    messageId: "sjsjsjuupeftyniw44i2fin",
    avatar: "https://picsum.photos/200/300",
    alignment: "right",
    username: "Shelpidy",
    message: "Ohh, sorry about that?",
    date: new Date(),
  },
  {
    userId: "sjsjsjuupe89fniw44i2fin",
    messageId: "sjsjsjuupe89fniw44i2fin",
    avatar: "https://picsum.photos/200/300",
    alignment: "left",
    username: "Alberta",
    message:
      "I have been asking you for the past three hours and you have not responed yet?",
    date: new Date(),
  },
  {
    userId: "sjsjs4tjuupefniw44i2fin",
    messageId: "sjsjs4tjuupefniw44i2fin",
    avatar: "https://picsum.photos/200/300",
    alignment: "right",
    username: "Alberta",
    message: "I said sorry now..",
    date: new Date(),
  },
];

interface MessageDisplayProps {
    roomId:string,
    socket:Socket
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({roomId,socket}) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<BubbleProps[]>(dummyMessages);
  const [messageInput, setMessageInput] = useState<string>("");
  let ref = React.useRef(null);

  const theme = useTheme();

  useEffect(() => {

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("typing", (user: string) => {
      setTypingUsers((prevTypingUsers) =>
        prevTypingUsers.includes(user)
          ? prevTypingUsers
          : [...prevTypingUsers, user],
      );
      setTimeout(() => {
        setTypingUsers((prevTypingUsers) =>
          prevTypingUsers.filter((username) => username !== user),
        );
      }, 2000); // Clear typing status after 2 seconds
    });

    socket.on("online", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("message", (message: BubbleProps) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
      <Box
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#f6f6f6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            minWidth: "50vw",
            backgroundColor: theme.palette.primary.main,
            paddingLeft: "10px",
            padding: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Avatar
              alt="Profile Image"
              src="https://picsum.photo/200/200"
              sx={{ width: 30, height: 30 }}
            />
            <Typography variant="h6" color="primary">
              Dennis Sesasy
            </Typography>
          </Box>
          <Typography color="primary.light" variant="body1">
            typing...
          </Typography>
          <Typography color="primary.light" variant="body1">
            online
          </Typography>
        </Box>
        <Box
          className="hide-scrollbar"
          sx={{
            display: "flex",
            minWidth: "50vw",
            flexDirection: "column",
            height: "90vh",
            overFlowY: "auto",
          }}
        >
          {messages.map((message) => {
            return <MessageBubble key={message.messageId} {...message} />;
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Box>
            <TextField
              variant="outlined"
              multiline
              size="small"
              placeholder="Type a message..."
            />
          </Box>
          <IconButton>
            <SendOutlined />
          </IconButton>
        </Box>
      </Box>
  );
};

export default MessageDisplay;
