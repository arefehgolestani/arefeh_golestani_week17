import { Routes, Route, useNavigate } from "react-router-dom";
import ContactsProvider from "./context/ContactsProvider";

import HomePage from "./pages/HomePage.jsx";
import AddContactPage from "./pages/AddContactPage.jsx";


function App() {


  return (
    <>
      <ContactsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="add-contact" element={<AddContactPage />} />
        </Routes>

       
      </ContactsProvider>
    </>
  );
}

export default App;
