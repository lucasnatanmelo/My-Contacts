import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../components/utils/toast';

export default function NewContact() {
    const contactFormRef = useRef(null);

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                categroy_id: formData.categoryId,
            };

            await ContactsService.createContact(contact);

            contactFormRef.current.resetFields();

            toast({
                type: 'success',
                text: 'Contato cadastrado com sucesso',
                duratio: 3000,
            });
        } catch {
            toast({
                type: 'danger',
                text: 'Ocorreu um erro ao cadastrar o contato!',
            });

            // CustomEvent - construtor do eventListener
            // Event é mandado somente com a string, custom deve ter especificações
        }
    }

    return (
      <>
        <PageHeader
          title="Novo Contato"
        />

        <ContactForm
          ref={contactFormRef}
          buttonLabel="Cadastrar"
          onSubmit={handleSubmit}
        />
      </>
    );
}
