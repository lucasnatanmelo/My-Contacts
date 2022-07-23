import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../components/utils/toast';

export default function NewContact() {
    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                categroy_id: formData.categoryId,
            };

            await ContactsService.createContact(contact);

            toast({
                type: 'success',
                text: 'Contato cadastrado com sucesso',
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
          buttonLabel="Cadastrar"
          onSubmit={handleSubmit}
        />
      </>
    );
}
