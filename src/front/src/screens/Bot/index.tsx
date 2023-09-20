import React, { useEffect } from 'react';
import { FlexComponent } from '../../components/FlexComponent';
import { socket } from '../../services';

// import { Container } from './styles';

const Bot: React.FC = () => {
  useEffect(() => {
    socket.connect();
    socket.on('botConect', () => {
      console.log('botConect');
    });
  }, []);

  return <FlexComponent></FlexComponent>;
};

export default Bot;
