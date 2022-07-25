/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */

import { Link } from 'react-router-dom';
import {
 useState, useEffect, useMemo, useCallback,
} from 'react';

import {
  Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import ContactsService from '../../services/ContactsService';
import toast from '../../components/utils/toast';
// import Modal from '../../components/Modal';

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
       //  contact.name.toLowerCase().startsWith(searchTerm.toLowerCase()) -> Filtrar pelas iniciais
    )), [contacts, searchTerm]);

    // O UseCalback é utilizado sempre que variáveis e funções são declaradas
    // internamente a array de dependecias
    // Para não acontecer redenrizações infinitas
    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            // const contactsList = []; await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch (error) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

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

    function handleDeleteContact(contact) {
        setContactBeingDeleted(contact);
        setIsDeleteModalVisible(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContactBeingDeleted(null);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);

            setContacts((prevState) => prevState.filter(
                (contact) => contact.id !== contactBeingDeleted.id,
            ));

            handleCloseDeleteModal();

            toast({
                type: 'success',
                text: 'Contato deletado com sucesso',
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao deletar o contato',
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }

    return (

      <Container>

        <Modal
          danger
          isLoading={isLoadingDelete}
          visible={isDeleteModalVisible}
          title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
          confirmLabel="Deletar"
          cancelLabel="Cancelar"
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteContact}
        >
          <p>Esta ação não poderá ser desfeita</p>
        </Modal>

        <Loader isLoading={isLoading} />

        {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato pelo nome"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
)}

        <Header justifyContent={
            // eslint-disable-next-line no-nested-ternary
            hasError
                ? 'flex-end'
                : (
                    contacts.length > 0
                        ? 'space-between'
                        : 'center'
                )

        }
        >
          {(!hasError && contacts.length > 0) && (
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
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>"Novo contato"</strong> acima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
        )}
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
                <button type="button" onClick={() => handleDeleteContact(contact)}>
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
