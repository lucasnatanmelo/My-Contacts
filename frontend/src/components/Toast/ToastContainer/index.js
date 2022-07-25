import { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import { toastEventMager } from '../../utils/toast';

export default function ToastContainer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function handleAddToast({ type, text, duration }) {
            setMessages((prevState) => [
                ...prevState,
                {
                    id: Math.random(),
                    type,
                    text,
                    duration,
                },
            ]);
        }

        toastEventMager.on('addtoast', handleAddToast);

        return () => {
            toastEventMager.removeListener('addtoast', handleAddToast);
        };
    }, []);

    const handleRemoveMessage = useCallback((id) => {
        setMessages((prevState) => prevState.filter(
            (message) => message.id !== id,
        ));
    }, []);

    return (
      <Container>
        {messages.map((message) => (
          <ToastMessage
            key={message.id}
            message={message}
            onRemoveMessage={handleRemoveMessage}
          />
        ))}
      </Container>
    );
}
