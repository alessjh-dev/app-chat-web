import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, useMediaQuery, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import theme from './theme';

interface Message {
  text: string;
  user: 'me' | 'bot';
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
  lastMessage: string;
}

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setSelectedChatId(parsedChats[0].id);
      } else {
        handleNewChat();
      }
    } else {
      handleNewChat();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChatId = chats.length ? chats[chats.length - 1].id + 1 : 1;
    const newChat: Chat = { id: newChatId, title: `Chat ${newChatId}`, messages: [], lastMessage: '' };
    setChats([...chats, newChat]);
    setSelectedChatId(newChatId);
  };

  const handleSelectChat = (id: number) => {
    setSelectedChatId(id);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = (message: Message) => {
    if (selectedChatId !== null) {
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChatId ? { ...chat, messages: [...chat.messages, message], lastMessage: message.text } : chat
        )
      );
    }
  };

  const handleDeleteChat = (id: number) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== id));
    if (selectedChatId === id) {
      setSelectedChatId(null);
      if (chats.length > 1) {
        setSelectedChatId(chats[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId) || null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#2c2c2c' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6">
              GeminX
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
          <ChatSidebar 
            chats={chats} 
            onSelectChat={handleSelectChat} 
            onNewChat={handleNewChat} 
            onDeleteChat={handleDeleteChat} 
            isOpen={isSidebarOpen} 
            onClose={toggleSidebar}
          />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
            <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
