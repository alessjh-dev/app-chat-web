import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import theme from './theme';

const App: React.FC = () => {
  const [chats, setChats] = useState<{ id: number, title: string }[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const handleNewChat = () => {
    const newChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
    setSelectedChat(newChat.id);
  };

  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box sx={{ width: '250px', borderRight: '1px solid #ccc' }}>
          <ChatSidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ChatWindow />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
