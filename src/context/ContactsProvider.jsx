import { useReducer, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ContactsContext from "./ContactsContext";

import Modal from "../components/Modal.jsx";
import Alert from "../components/Alert.jsx";

import { initialState } from "../constants/initialState";
import { contactsReducer } from "./contactsReducer";

function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  const { contacts, contact, alert, modal } = state;

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);

    dispatch({ type: "SET_CONTACTS", payload: newContacts });

    dispatch({ type: "CLEAR_MODAL" });
    dispatch({
      type: "SET_ALERT",
      payload: { type: "warning", message: "مخاطب حذف شد!" },
    });
  };

  const deleteSelectedContacts = (selectedIds) => {
    const newContacts = contacts.filter((c) => !selectedIds.includes(c.id));
    dispatch({ type: "SET_CONTACTS", payload: newContacts });
  };

  const navigate = useNavigate();

  const editHandler = (id) => {
    const editedContact = contacts.find((contact) => contact.id === id);
    navigate("/add-contact", { state: editedContact });
  };

  return (
    <ContactsContext.Provider
      value={{
        ...state,
        dispatch,
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
          onClose={() => dispatch({ type: "CLEAR_ALERT" })}
        />
      )}

      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onConfirm={modal.onConfirm}
          onCancel={() => dispatch({ type: "CLEAR_MODAL" })}
        />
      )}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;
