import React from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Divider, IconButton, Tooltip, Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ChatSidebarProps {
  chats: { id: number; title: string; lastMessage: string }[];
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
  isOpen: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat, onDeleteChat, isOpen }) => {
  return (
    <Box
      sx={{
        width: isOpen ? '250px' : { xs: '0', md: '60px' },
        height: '100%',
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
      {isOpen ? (
        <>
          <Box sx={{ padding: '10px' }}>
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
        </>
      ) : (
        <>
          <Tooltip title="Nuevo Chat">
            <IconButton onClick={onNewChat} sx={{ backgroundColor: '#4caf50', color: '#fff', margin: '10px' }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent={chats.length} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '1.2rem', height: '30px', minWidth: '30px' } }}>
              <Typography variant="body2" sx={{ visibility: 'hidden' }}>Chats</Typography>
            </Badge>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatSidebar;
