

function Contact({ contact, onDelete }) {
    return (
      <li>
        <span>{contact.name}</span>
        <span>{contact.number}</span>
        <button onClick={() => onDelete(contact.id)}>Видалити</button>
      </li>
    );
  }
  
  export default Contact;