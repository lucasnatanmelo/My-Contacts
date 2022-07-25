import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
 message, onRemoveMessage,
}) {
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            onRemoveMessage(message.id);
        }, message.duration || 7000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [message, onRemoveMessage]);

    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
      <Container
        type={message.type}
        onClick={handleRemoveToast}
        // Acessibilidade:
        tabIndex={0}
        role="button"
      >
        {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
        {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}

        <strong>{message.text}</strong>
      </Container>
    );
}

ToastMessage.propTypes = {

    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['default', 'success', 'danger']),
        duration: PropTypes.number,
    }).isRequired,

    onRemoveMessage: PropTypes.func.isRequired,
};
