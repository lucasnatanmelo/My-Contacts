import { useState, useEffect } from 'react';
import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import { toastEventMager } from '../../utils/toast';

export default function ToastContainer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function handleAddToast({ type, text }) {
            setMessages((prevState) => [
                ...prevState,
                { id: Math.random(), type, text },
            ]);
        }

        toastEventMager.on('addtoast', handleAddToast);

        return () => {
            toastEventMager.removeListener('addtoast', handleAddToast);
        };
    });
    return (
      <Container>
        {messages.map((message) => (
          <ToastMessage
            key={message.id}
            type={message.type}
            text={message.text}
          />
        ))}
      </Container>
    );
}
