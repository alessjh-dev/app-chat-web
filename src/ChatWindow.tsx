import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, List, ListItem, Paper } from '@mui/material';
import MessageContent from './MessageContent';

interface Message {
  text: string;
  user: 'me' | 'bot';
}

interface ChatWindowProps {
  chat: { id: number; title: string; messages: Message[] } | null;
  onSendMessage: (message: Message) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage }) => {
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat?.messages]);

  const handleSend = async () => {
    if (input.trim() && chat) {
      const newMessage: Message = { text: input, user: 'me' };
      onSendMessage(newMessage);

      try {
        const response = await axios.post('https://python-hello-world-beta-topaz.vercel.app/chat', { message: input });
        const botMessage: Message = { text: response.data.message, user: 'bot' };
        onSendMessage(botMessage);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#121212', color: '#fff' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse', padding: '10px' }}>
        <List>
          {chat?.messages.map((message, index) => (
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
          <div ref={messagesEndRef} />
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
