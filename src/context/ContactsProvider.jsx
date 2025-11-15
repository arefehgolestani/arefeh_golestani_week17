import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import ContactsContext from "./ContactsContext";

import Modal from "../components/Modal.jsx";
import Alert from "../components/Alert.jsx";

function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    job: "",
    phone: "",
  });

  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    setModal(null);
    setAlert({
      type: "warning",
      message: "مخاطب حذف شد!",
    });
  };

  const deleteSelectedContacts = (selectedIds) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedIds.includes(contact.id))
    );
  };

  const navigate = useNavigate();

  const editHandler = (id) => {
    const editedContact = contacts.find((contact) => contact.id === id);
    navigate("/add-contact", { state: editedContact });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        contact,
        setContact,
        alert,
        setAlert,
        modal,
        setModal,
        deleteHandler,
        deleteSelectedContacts,
        editHandler,
      }}
    >
      {children}

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          duration={alert.duration || 2000}
          onClose={() => setAlert(null)}
        />
      )}

      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal(null)}
        />
      )}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;