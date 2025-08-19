// context/ModalContext.jsx
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {modal === "login" && <LoginModal onClose={closeModal} />}
      {modal === "createStartup" && <CreateStartupModal onClose={closeModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);