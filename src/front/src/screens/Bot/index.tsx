import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { FlexComponent } from '../../components/FlexComponent';
import { socket } from '../../services';

// import { Container } from './styles';

enum SocketState {
  CONFLICT = 'CONFLICT',
  CONNECTED = 'CONNECTED',
  DEPRECATED_VERSION = 'DEPRECATED_VERSION',
  OPENING = 'OPENING',
  PAIRING = 'PAIRING',
  PROXYBLOCK = 'PROXYBLOCK',
  SMB_TOS_BLOCK = 'SMB_TOS_BLOCK',
  TIMEOUT = 'TIMEOUT',
  TOS_BLOCK = 'TOS_BLOCK',
  UNLAUNCHED = 'UNLAUNCHED',
  UNPAIRED = 'UNPAIRED',
  UNPAIRED_IDLE = 'UNPAIRED_IDLE',
  DISCONNECTED = 'DISCONNECTED',
  SYNCING = 'SYNCING',
  RESUMING = 'RESUMING',
  WITHOUT_INTERNET = 'WITHOUT INTERNET',
}

const Bot: React.FC = () => {
  const [ImageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on('message', (status) => {
      console.log('🚀 ~ file: index.tsx:31 ~ socket.on ~ status:', status);
      socket.emit('message', 'DeliveryBot');
      if (status === SocketState.CONNECTED || status === SocketState.TIMEOUT) {
        socket.disconnect();
      }
    });
    socket.on('message.text', (text) => {
      console.log(text);
    });

    socket.on('ready', (imagePath) => {
      setImageSrc(imagePath);
    });

    socket.emit('ready');
    socket.emit('message', 'DeliveryBot');
  }, [ImageSrc]);

  return (
    <FlexComponent alignItems='center' justifyContent='center'>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '50%', width: '800px' }}
        value={ImageSrc}
      />
    </FlexComponent>
  );
};

export default Bot;
