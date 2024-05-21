import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

interface ChatSidebarProps {
  chats: { id: number; title: string; lastMessage: string }[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat, onDeleteChat }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        width: isOpen ? '250px' : { xs: '0', md: '60px' },
        height: '100vh',
        backgroundColor: '#2c2c2c',
        color: '#fff',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: { xs: 'absolute', md: 'relative' },
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        {isOpen && (
          <Typography variant="h6" sx={{ marginLeft: '10px' }}>
            Chats
          </Typography>
        )}
      </Box>
      {isOpen && (
        <>
          <Divider sx={{ borderColor: '#424242' }} />
          <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={onNewChat} fullWidth>
            Nuevo Chat
          </Button>
          <Divider sx={{ borderColor: '#424242' }} />
          <List sx={{ width: '100%' }}>
            {[...chats].reverse().map((chat) => (  // Reverse the order of chats
              <ListItem key={chat.id} sx={{ color: '#fff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <ListItemText 
                    primary={chat.lastMessage || chat.title}
                    onClick={() => onSelectChat(chat.id)}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  />
                  <IconButton onClick={() => onDeleteChat(chat.id)} sx={{ color: '#fff' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default ChatSidebar;
