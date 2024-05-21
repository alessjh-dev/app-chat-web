import React from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Divider } from '@mui/material';

interface ChatSidebarProps {
  chats: { id: number, title: string }[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat }) => {
  return (
    <Box sx={{ width: '100%', height: '100vh', padding: '10px', backgroundColor: '#1d1d1d', color: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <Divider sx={{ marginBottom: '10px', borderColor: '#424242' }} />
      <Button variant="contained" color="primary" onClick={onNewChat} fullWidth>
        Nuevo Chat
      </Button>
      <Divider sx={{ marginY: '10px', borderColor: '#424242' }} />
      <List>
        {chats.map((chat) => (
          <ListItem button key={chat.id} onClick={() => onSelectChat(chat.id)} sx={{ color: '#fff' }}>
            <ListItemText primary={chat.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
