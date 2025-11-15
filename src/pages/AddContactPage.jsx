import { Link, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { ImAddressBook } from "react-icons/im";
import { useEffect } from "react";
import { useContext } from "react";

import ContactsContext from "../context/ContactsContext";
import styles from "./AddContactPage.Module.css";
import inputs from "../constants/inputs.js";
import Modal from "../components/Modal";
import Alert from "../components/Alert";

function AddContactPage() {
  const {
    contact,
    setContact,
    contacts,
    setContacts,
    alert,
    setAlert,
    modal,
    setModal,
  } = useContext(ContactsContext);

  const navigate = useNavigate();
  const location = useLocation();
  const contactToEdit = location.state;

  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    } else {
      setContact({
        id: "",
        name: "",
        email: "",
        job: "",
        phone: "",
      });
    }
  }, [contactToEdit]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const addHandler = () => {
    if (!contact.name || !contact.job || !contact.email || !contact.phone) {
      setModal(null);
      setAlert({
        type: "error",
        message: "تمام فیلدها باید پر شوند!",
      });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contact.email)) {
      setAlert({ type: "error", message: "ایمیل معتبر نیست!" });
      setModal(null);
      return;
    }

    const phonePattern = /^09\d{9}$/;
    if (!phonePattern.test(contact.phone)) {
      setAlert({
        type: "error",
        message: "شماره تلفن باید ۱۱ رقم و با 09 شروع شود!",
      });
      setModal(null);
      return;
    }

    if (contact.id) {
      const updatedContacts = contacts.map((item) =>
        item.id === contact.id ? contact : item
      );
      setContacts(updatedContacts);
      setAlert({ type: "success", message: "مخاطب با موفقیت ویرایش شد!" });
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
      setAlert({
        type: "success",
        message: "مخاطب با موفقیت افزوده شد!",
      });
    }
    setModal(null);
    navigate("/");
  };

  const openAddModal = () => {
    setModal({
      title: contact.id ? "ویرایش مخاطب" : "افزودن مخاطب جدید",
      message: contact.id
        ? "آیا از ویرایش این مخاطب اطمینان دارید؟"
        : "آیا از افزودن مخاطب جدید اطمینان دارید؟",
      confirmText: contact.id ? "ویرایش" : "افزودن",
      cancelText: "انصراف",
      onConfirm: addHandler,
    });
  };

  return (
    <div className={styles.container}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className={styles.header}>
        <h3>{contact.id ? "ویرایش مخاطب" : "افزودن مخاطب"}</h3>
        <button>
          <Link to="/">
            <ImAddressBook color="#8dae95" fontSize="1.1rem" />
          </Link>
        </button>
      </div>

      <div className={styles.inputs_container}>
        {inputs.map((input, index) => (
          <div className={styles.inputs} key={index}>
            <label>{input.placeholder}</label>
            <input
              type={input.type}
              name={input.name}
              onChange={changeHandler}
              value={contact[input.name] || ""}
            />
          </div>
        ))}

        <button onClick={openAddModal}>
          {contact.id ? "ویرایش مخاطب" : "افزودن مخاطب"}
        </button>
        {contact.id && (
          <button>
            {" "}
            <Link style={{ color: "#fff" }} to="/">
              {" "}
              بازگشت
            </Link>
          </button>
        )}
      </div>

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
    </div>
  );
}

export default AddContactPage;
