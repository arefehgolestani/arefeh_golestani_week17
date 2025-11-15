import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { useState } from "react";
import { useContext } from "react";

import ContactsContext from "../context/ContactsContext";
import ContactItem from "../components/ContactItem.jsx";
import styles from "./HomePage.module.css";
import Alert from "../components/Alert";
import Search from "../components/Search.jsx";

function HomePage() {
  const {
    contacts,
    alert,
    setAlert,
    modal,
    setModal,
    deleteHandler,
    editHandler,
    deleteSelectedContacts,
  } = useContext(ContactsContext);

  const [search, setSearch] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleSelect = (id) => {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    setModal(null);
  };

  const filteredContacts = search
    ? contacts.filter((contact) => {
        return (
          contact.name?.toLowerCase().includes(search) ||
          contact.email?.toLowerCase().includes(search)
        );
      })
    : contacts;

  const deleteAllHandler = () => {
    setDeleteButton(true);
  };

  const selectedDeleteButton = () => {
    if (selectedContacts.length === 0) {
      setAlert({
        type: "warning",
        message: "هیچ مخاطبی انتخاب نشده است !",
      });
    } else {
      setModal({
        title: "حذف گروهی مخاطبین",
        message: `آیا از حذف ${selectedContacts.length} مخاطب  اطمینان دارید؟ `,
        confirmText: "حذف",
        cancelText: "انصراف",
        onConfirm: () => selectedDeleteHandler(),
      });
    }
  };
  const selectedDeleteHandler = () => {
    deleteSelectedContacts(selectedContacts);
    setSelectedContacts([]);
    setModal(null);
    setDeleteButton(false);
    setAlert({
      type: "success",
      message: `${selectedContacts.length} مخاطب حذف شد.`,
    });
  };

  return (
    <>
      <div className={styles.container}>
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className={styles.header}>
          <Search search={search} setSearch={setSearch} />
          <div>
            {contacts.length ? (
              !deleteButton ? (
                <button onClick={deleteAllHandler}>
                  <FaTrashAlt color="#8dae95" fontSize="1rem" />
                </button>
              ) : (
                <>
                  <button onClick={selectedDeleteButton}>
                    <FaTrashAlt color="#8dae95" fontSize="1rem" />
                  </button>
                  <button onClick={() => setDeleteButton(false)}>
                    <TiArrowBack color="#8dae95" fontSize="1.3rem" />
                  </button>
                </>
              )
            ) : (
              <button onClick={deleteAllHandler}>
                <FaTrashAlt color="#8dae95" fontSize="1rem" />
              </button>
            )}

            <button>
              <Link to="/add-contact">
                <ImPlus color="#8dae95" fontSize="1rem" />
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.contacts}>
          {contacts.length === 0 ? (
            <p>در حال حاضر هیچ موردی وجود ندارد!</p>
          ) : filteredContacts.length === 0 ? (
            <p>موردی یافت نشد!</p>
          ) : (
            <ul className={styles.contacts_list}>
              {filteredContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  data={contact}
                  setModal={setModal}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                  deleteButton={deleteButton}
                  toggleSelect={toggleSelect}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
