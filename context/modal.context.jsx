import { createContext, useContext, useState } from "react";

const ModalWrapper = createContext();

const ModalContext = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [objID, setObjID] = useState(null);
  const [objType, setObjType] = useState("");

  const prepDelete = (id, type) => {
    setObjID(id);
    setObjType(type);
    setShowModal(!showModal);
  };

  return <ModalWrapper.Provider value={{ showModal, setShowModal, prepDelete, objType, objID }}>{children}</ModalWrapper.Provider>;
};

const ModalState = () => useContext(ModalWrapper);

export { ModalState, ModalContext };
