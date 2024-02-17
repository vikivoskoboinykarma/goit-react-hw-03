import {  useState, useEffect} from 'react';
import { SearchBox } from './SearchBox/SearchBox';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

const getInitialUsers = () => {
  // Отримання контактів з локального сховища або встановлення початкових значень
  return JSON.parse(localStorage.getItem('contacts')) || [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ];
};

export const App = () => {
  const [users, setUsers] = useState(getInitialUsers);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    // Збереження контактів у локальному сховищі при їх зміні
    localStorage.setItem('contacts', JSON.stringify(users));
  }, [users]);

  const addUser = (name, number) => {
    const newUser = { id: nanoid(), name, number };
    setUsers([...users, newUser]);
  };

  const deleteUser = userId => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const visibleUsers = users.filter(user =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const changeFilter = e => {
    setNameFilter(e.target.value);
  };

  return (
    <div style={{ padding: 8 }}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addUser} />
      <SearchBox value={nameFilter} onChange={changeFilter} />
      <ContactList contacts={visibleUsers} onDeleteContact={deleteUser} />
    </div>
  );
};