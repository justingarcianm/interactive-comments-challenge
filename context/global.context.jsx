import { createContext, useContext, useState } from "react";

const StateWrapper = createContext();

const StateProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [objID, setObjID] = useState(null);
  const [objType, setObjType] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentComments, setCurrentComments] = useState([]);

  const prepDelete = (id = null, type = "", authorID = "") => {
    setObjID(id);
    setObjType(type);
    setAuthorId(authorID);
    setShowModal(!showModal);
  };

  return <StateWrapper.Provider value={{ showModal, setShowModal, prepDelete, objType, objID, authorId, currentUser, setCurrentUser, currentComments, setCurrentComments }}>{children}</StateWrapper.Provider>;
};

const GlobalState = () => useContext(StateWrapper);

export { GlobalState, StateProvider };
