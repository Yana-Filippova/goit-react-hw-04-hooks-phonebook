import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Container from './components/Container';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const item = {
      id: shortid.generate(),
      name,
      number,
    };

    if (name === '' || number === '') {
      alert('Please enter all fields!');
      return;
    }

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
    } else {
      setContacts(contacts => [item, ...contacts]);
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}

      {contacts.length > 0 ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>Currently your phonebook has no contacts. Please add them.</p>
      )}
    </Container>
  );
}

//Class usage
// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (nextContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const item = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     const { contacts } = this.state;

//     if (name === '' || number === '') {
//       alert('Please enter all fields!');
//       return;
//     }

//     if (contacts.find(contact => contact.name === name)) {
//       alert(`${name} is already in contacts`);
//       return;
//     } else if (contacts.find(contact => contact.number === number)) {
//       alert(`${number} is already in contacts`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [item, ...contacts],
//       }));
//     }
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter, contacts } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />

//         <h2>Contacts</h2>
//         {contacts.length > 1 && (
//           <Filter value={filter} onChange={this.changeFilter} />
//         )}

//         {contacts.length > 0 ? (
//           <ContactList
//             contacts={visibleContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         ) : (
//           <p>Currently your phonebook has no contacts. Please add them.</p>
//         )}
//       </Container>
//     );
//   }
// }

// export default App;
