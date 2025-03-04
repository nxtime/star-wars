import { createContext, FC, PropsWithChildren, useState } from "react";
import { ModalState } from "@/models/modal.model";

interface ModalContextType {
  modalState: ModalState;
  openModal: (modal: string) => void;
  closeModal: () => void;
}

const initialModalState: ModalState = {
  isOpen: false,
  modal: null
};

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = (modal: string) => {
    setModalState({ isOpen: true, modal });
  };

  const closeModal = () => {
    const triggerElement = document.querySelector("[data-modal-triggered=\"true\"]");

    if (triggerElement) {
      triggerElement.removeAttribute("data-modal-triggered");
    }

    setModalState({ isOpen: false, modal: null });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
