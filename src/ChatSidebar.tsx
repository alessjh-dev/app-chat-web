import React from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Divider, IconButton, Drawer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ChatSidebarProps {
  chats: { id: number; title: string; lastMessage: string }[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat, onDeleteChat, isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '250px', md: '250px' },
          backgroundColor: '#2c2c2c',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ padding: '10px', marginTop:'5rem' }}>
          <Typography variant="h6">
            Chats
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#424242' }} />
        <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={onNewChat} fullWidth>
          Nuevo Chat
        </Button>
        <Divider sx={{ borderColor: '#424242' }} />
        <List sx={{ width: '100%' }}>
          {[...chats].reverse().map((chat) => (
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
      </Box>
    </Drawer>
  );
};

export default ChatSidebar;
