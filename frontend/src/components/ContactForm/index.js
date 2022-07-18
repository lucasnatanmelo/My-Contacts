import PropTypes from 'prop-types';
import { useState } from 'react';

import isEmailValid from '../utils/isEmailValid';
import formatPhone from '../utils/formatPhone';
import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './style';

import FormGroup from '../FormGroup';
import Input from '../Input/styles';
import Select from '../Select/styles';
import Button from '../Button/styles';

// Controlled Components - Será utilizado nesse projeto
// Uncontrolled Components

// A prop buttonLabel é dinâmica, vindo de New Contact ou Edit Contact

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');

    const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
    } = useErrors();

    // Lógica: isFormValid será true se o form ter um nome a array de erro for vazia
    const isFormValid = (name && errors.length === 0);

    function handleNameChange(event) {
        setName(event.target.value);

        // Verifica se foi preenchido com o nome
        // Lógica: Caso não seja preenchido, é colocado no array de erros pela serError
        if (!event.target.value) {
            setError({ field: 'name', message: 'Nome é obrigatório. ' });
        // removeError retira o erro da array de erro caso exista
        } else {
            removeError('name');
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
        // Nessa caso, o email não é obrigatório, mas passa por uma validação
        // Lógica: Se o valor foi digitado mas o email é invalido, logo inclui no array de erros
        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: 'email', message: 'Email inválido.' });
        // Caso seja válido, retira do array de erros
        } else {
            removeError('email');
        }
    }

    // console.log(errors);

    function handlePhoneChange(event) {
        setPhone(formatPhone(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log({
            name, email, phone: phone.replace(/\D/g, ''), category,
        });
    }

    return (
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup
          error={getErrorMessageByFieldName('name')}
        >
          <Input
            error={getErrorMessageByFieldName('name')}
            placeholder="Nome *"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>

        <FormGroup
          error={getErrorMessageByFieldName('email')}
        >
          <Input
            type="email"
            error={getErrorMessageByFieldName('email')}
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Telefone"
            value={phone}
            onChange={handlePhoneChange}
            maxLength="15"
          />
        </FormGroup>

        <FormGroup>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Categoria</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>

          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid}>
            {buttonLabel}
          </Button>
        </ButtonContainer>

      </Form>
    );
}

// Na estrutura de FormGroup é repassado o valor de children
// Logo, children, será o Input
// Para demonstração dos event listeners, Aula: Atribuindo eventos a campos de forms

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
