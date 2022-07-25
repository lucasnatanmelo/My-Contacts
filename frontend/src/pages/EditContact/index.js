import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import toast from '../../components/utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');
    const contactFormRef = useRef(null);

    const { id } = useParams();
    const history = useHistory();
    const safeAsyncAction = useSafeAsyncAction();

    useEffect(() => {
        async function loadContacts() {
            try {
                const contact = await ContactsService.getContactById(
                    id,
                );
                // console.log(contact);
                    safeAsyncAction(() => {
                        contactFormRef.current.setFieldsValues(contact);
                        setIsLoading(false);
                        setContactName(contact.name);
                    });
            } catch (err) {
                    safeAsyncAction(() => {
                        history.push('/');
                        toast({
                            type: 'danger',
                            text: 'Contato não encontrado',
                        });
                    });
            }
        }
        loadContacts();
    }, [id, history, safeAsyncAction]);

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };
            // console.log({ id, contact });
            const contactData = await ContactsService.updateContact(
                id,
                contact,
);
            setContactName(contactData.name);
            toast({
                type: 'success',
                text: 'Contato editado com sucesso',
                duratio: 3000,
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao editar o contato!',
            });
        }
    }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>

  );
}
