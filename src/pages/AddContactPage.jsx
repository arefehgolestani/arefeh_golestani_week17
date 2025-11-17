import { Link, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { ImAddressBook } from "react-icons/im";
import { useEffect, useContext } from "react";

import ContactsContext from "../context/ContactsContext";
import styles from "./AddContactPage.Module.css";
import inputs from "../constants/inputs.js";
import Modal from "../components/Modal";
import Alert from "../components/Alert";

function AddContactPage() {
  const { contact, contacts, dispatch, alert, modal } =
    useContext(ContactsContext);

  const navigate = useNavigate();
  const location = useLocation();
  const contactToEdit = location.state;

  useEffect(() => {
    if (contactToEdit) {
      dispatch({ type: "SET_CONTACT", payload: contactToEdit });
    } else {
      dispatch({
        type: "SET_CONTACT",
        payload: {
          id: "",
          name: "",
          email: "",
          job: "",
          phone: "",
        },
      });
    }
  }, [contactToEdit]);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "SET_CONTACT",
      payload: { ...contact, [name]: value },
    });
  };

  const addHandler = () => {
    if (!contact.name || !contact.job || !contact.email || !contact.phone) {
      dispatch({
        type: "SET_ALERT",
        payload: { type: "error", message: "تمام فیلدها باید پر شوند!" },
      });
      dispatch({ type: "CLEAR_MODAL" });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contact.email)) {
      dispatch({
        type: "SET_ALERT",
        payload: { type: "error", message: "ایمیل معتبر نیست!" },
      });
      dispatch({ type: "CLEAR_MODAL" });
      return;
    }

    const phonePattern = /^09\d{9}$/;
    if (!phonePattern.test(contact.phone)) {
      dispatch({
        type: "SET_ALERT",
        payload: {
          type: "error",
          message: "شماره تلفن باید ۱۱ رقم و با 09 شروع شود!",
        },
      });
      dispatch({ type: "CLEAR_MODAL" });
      return;
    }

    if (contact.id) {
      dispatch({ type: "UPDATE_CONTACT", payload: contact });
      dispatch({
        type: "SET_ALERT",
        payload: { type: "success", message: "مخاطب با موفقیت ویرایش شد!" },
      });
    } else {
      const newContact = { ...contact, id: v4() };
      dispatch({ type: "ADD_CONTACT", payload: newContact });

      dispatch({
        type: "SET_ALERT",
        payload: { type: "success", message: "مخاطب با موفقیت افزوده شد!" },
      });
    }

    dispatch({ type: "CLEAR_MODAL" });
    navigate("/");
  };

  const openAddModal = () => {
    dispatch({
      type: "SET_MODAL",
      payload: {
        title: contact.id ? "ویرایش مخاطب" : "افزودن مخاطب جدید",
        message: contact.id
          ? "آیا از ویرایش این مخاطب اطمینان دارید؟"
          : "آیا از افزودن مخاطب جدید اطمینان دارید؟",
        confirmText: contact.id ? "ویرایش" : "افزودن",
        cancelText: "انصراف",
        onConfirm: addHandler,
      },
    });
  };

  return (
    <div className={styles.container}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => dispatch({ type: "CLEAR_ALERT" })}
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
            <Link style={{ color: "#fff" }} to="/">
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
          onCancel={() => dispatch({ type: "CLEAR_MODAL" })}
        />
      )}
    </div>
  );
}

export default AddContactPage;
