import { useContext } from "react";
import { ModalContext } from "@/contexts/modal.context";

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modalState, openModal, closeModal } = context;

  return {
    ...modalState,
    openModal,
    closeModal
  };
};
