export const contactsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

    //   case "DELETE_CONTACT":
    //     return {
    //       ...state,
    //       contacts: state.contacts.filter((c) => c.id !== action.payload),
    //     };

    //   case "DELETE_SELECTED":
    //     return {
    //       ...state,
    //       contacts: state.contacts.filter((c) => !action.payload.includes(c.id)),
    //     };

    case "SET_CONTACT":
      return {
        ...state,
        contact: action.payload,
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };

    case "CLEAR_ALERT":
      return {
        ...state,
        alert: null,
      };

    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload,
      };

    case "CLEAR_MODAL":
      return {
        ...state,
        modal: null,
      };

    default:
      return state;
  }
};
