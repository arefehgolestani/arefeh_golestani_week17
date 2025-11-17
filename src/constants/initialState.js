const saved = localStorage.getItem("contacts");
export const initialState = {
  contacts: saved ? JSON.parse(saved) : [],
  contact: {
    id: "",
    name: "",
    email: "",
    job: "",
    phone: "",
  },
  alert: null,
  modal: null,
};