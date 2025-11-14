import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AddContactPage from "./pages/AddContactPage.jsx";
import Modal from "./components/Modal.jsx";
import Alert from "./components/Alert.jsx";

function App() {
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);
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

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const navigate = useNavigate();

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

  const editHandler = (id) => {
    const editedContact = contacts.find((contact) => contact.id === id);
    navigate("/add-contact", { state: editedContact });
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              editHandler={editHandler}
              setAlert={setAlert}
              alert={alert}
              deleteHandler={deleteHandler}
              contacts={contacts}
              setModal={setModal}
              deleteSelectedContacts={deleteSelectedContacts}
            />
          }
        />
        <Route
          path="add-contact"
          element={
            <AddContactPage
              setAlert={setAlert}
              alert={alert}
              modal={modal}
              setModal={setModal}
              contacts={contacts}
              setContacts={setContacts}
              contact={contact}
              setContact={setContact}
            />
          }
        />
      </Routes>

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
    </>
  );
}

export default App;
