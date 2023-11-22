import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'styles/GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { Title } from './Title/Title';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

import { getContacts } from 'redux/contacts/contacts-selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  return (
    <Layout>
      <Section title="PhoneBook">
        <ContactForm />
        {contacts.length > 0 && (
          <>
            <Title title="Contacts" />
            <Filter />
            <ContactList />
          </>
        )}
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
};

// npm i prop-types
// npm i react-toastify
// npm i nanoid
// npm i react
// npm i react-icons
// npm i yup
// npm i formik
// npm i styled-components
// npm i modern-normalize
// npm i react-redux
