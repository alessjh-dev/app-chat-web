import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { Box, TextField, Button, List, ListItem, Paper } from '@mui/material';
import MessageContent from './MessageContent';

interface Message {
  text: string;
  user: 'me' | 'bot';
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { text: input, user: 'me' };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      try {
        const response = await axios.post('https://python-hello-world-beta-topaz.vercel.app/chat', { message: input });
        const botMessage: Message = { text: response.data.message, user: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', padding: '10px', backgroundColor: '#121212', color: '#fff' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.user === 'me' ? 'flex-end' : 'flex-start' }}>
              <Paper 
                sx={{
                  padding: '10px',
                  backgroundColor: message.user === 'me' ? '#1976d2' : '#424242',
                  color: '#fff',
                  maxWidth: '70%',
                  wordWrap: 'break-word'
                }}
              >
                <MessageContent text={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#1d1d1d' }}>
        <TextField
          fullWidth
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          label="Escribe un mensaje"
          variant="outlined"
          sx={{ backgroundColor: '#333', borderRadius: '4px', input: { color: '#fff' } }}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginLeft: '10px' }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
