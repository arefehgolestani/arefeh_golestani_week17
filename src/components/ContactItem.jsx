import { useContext } from "react";
import ContactsContext from "../context/ContactsContext";

import styles from "./ContactItem.module.css";
import Modal from "../components/Modal";

function ContactItem({
  deleteHandler,
  editHandler,
  data: { id, name, email, phone },
  deleteButton,
  toggleSelect,
}) {
  const { modal, dispatch } = useContext(ContactsContext);
  const openDeleteModal = () => {
    dispatch({
      type: "SET_MODAL",
      payload: {
        title: "حذف مخاطب",
        message: "آیا از حذف این مخاطب اطمینان دارید؟",
        confirmText: "حذف",
        cancelText: "انصراف",
        onConfirm: () => deleteHandler(id),
      },
    });
  };

  return (
    <li className={styles.contacts_item} key={id}>
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      {!deleteButton ? (
        <p>
          <button className="warning" onClick={() => editHandler(id)}>
            ویرایش
          </button>
          <button className="danger" onClick={openDeleteModal}>
            حذف
          </button>
        </p>
      ) : (
        <input type="checkbox" name={id} onChange={() => toggleSelect(id)} />
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
    </li>
  );
}

export default ContactItem;
