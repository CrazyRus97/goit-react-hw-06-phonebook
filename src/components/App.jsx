
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';

import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import initialContacts from './contacts.json';
import useLocalStorage from '../hooks/useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import Filter from './Filter/Filter';

const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    const isExist = contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    );

    if (isExist) {
      return toast.error(
        `${newContact.name}: is already in contacts`,
        notifyOptions
      );
    }

    setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );

    if (normalizedFilter && !filteredContacts.length) {
      toast.warn(`No contacts matching your request`, notifyOptions);
    }

    return filteredContacts;
  };

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm onAddContact={addContact} />

        {contacts.length > 0 && (
          <>
            <Title title="Contacts" />
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              onDelete={deleteContact}
              contacts={getVisibleContacts()}
            />
          </>
        )}
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
}


// npm i prop-types
// npm i react-toastify
// npm i nanoid
// npm i react
// npm i react-icons
// npm i yup
// npm i formik
// npm i styled-components
// npm i modern-normalize
