import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import {
  Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button/styles';

import ContactsService from '../../services/ContactsService';
// import Modal from '../../components/Modal';

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
       //  contact.name.toLowerCase().startsWith(searchTerm.toLowerCase()) -> Filtrar pelas iniciais
    )), [contacts, searchTerm]);

    async function loadContacts() {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch (error) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadContacts();
    }, [orderBy]);

    console.log('contacts: ', contacts);

    // Lembre-se que o valor de orderBy nunca é acessado pelo valor orderBy
    // Deve ser acessado pelo prevState por ser uma função assíncrona
    function handleToggleOrderBy() {
        setOrderBy(
            (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
        );
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handelTryAgain() {
        loadContacts();
    }

    return (

      <Container>

        {/* <Modal danger /> */}

        <Loader isLoading={isLoading} />

        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato pelo nome"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>

        <Header hasError={hasError}>
          {!hasError && (
            <strong>
                {filteredContacts.length}
                {filteredContacts.length === 1 ? ' contato' : ' contatos'}
            </strong>
        )}
          <Link to="/new">Novo Contato</Link>
        </Header>

        {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">

            <strong>Ocorreu um erro ao obter os seus contatos</strong>

            <Button type="button" onClick={handelTryAgain}>
              Tentar novamente
            </Button>

          </div>
        </ErrorContainer>
        )}

        {!hasError && (
        <>
          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
        )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && <small>{contact.category_name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
        )}

      </Container>

    );
}
