import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface MessageContentProps {
  text: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ text }) => {
  const renderContent = () => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      if (line.startsWith('*')) {
        const listItems = lines.filter(l => l.startsWith('*')).map((item, i) => (
          <ListItem key={i}>
            <ListItemText primary={item.substring(2)} />
          </ListItem>
        ));
        return <List key={index}>{listItems}</List>;
      }
      const parts = line.split('**');
      return (
        <Typography key={index} variant="body1" paragraph>
          {parts.map((part, i) => (
            i % 2 === 0 ? part : <strong key={i}>{part}</strong>
          ))}
        </Typography>
      );
    });
  };

  return <>{renderContent()}</>;
};

export default MessageContent;
