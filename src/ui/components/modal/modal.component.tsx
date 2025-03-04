import { FC, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { useModal } from '@/hooks/use-modal.hook';
import { useRouter } from '@/hooks/use-router.hook';

interface ModalProps extends PropsWithChildren {
  modalName: string;
  title: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ title, modalName, children }) => {
  const { isOpen, modal, closeModal } = useModal();
  const [isAnimating, setIsAnimating] = useState(false);
  const { removeParam } = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      removeParam("id");
      closeModal();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  const handleEscKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  };

  const getAnimationStyle = () => {
    const originRectElement = document.querySelector("[data-modal-triggered=\"true\"]");
    const originRect = originRectElement?.getBoundingClientRect();

    if (!originRect || !modalRef.current) return {};

    const modalRect = modalRef.current.getBoundingClientRect();

    const scaleX = originRect.width / modalRect.width;
    const scaleY = originRect.height / modalRect.height;
    const scale = Math.min(scaleX, scaleY, 0.5); // Limit max scale to 0.9

    const originCenter = {
      x: originRect.left - originRect.width / 2,
      y: originRect.top - originRect.height / 2
    }

    const translateX = originCenter.x - modalRect.left + (originRect.width - modalRect.width * scale) / 2;
    const translateY = originCenter.y - modalRect.top + (originRect.height - modalRect.height * scale) / 2;

    if (isAnimating) {
      return {
        transform: `translate(0px, 0px) scale(1)`,
        opacity: 1
      };
    }

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 0
    };
  };

  if (!isOpen && !isAnimating && modal === modalName) return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${isAnimating ? styles.backdropVisible : styles.backdropHidden}`}
      onClick={handleBackdropClick}
      onKeyDown={handleEscKey}
      ref={backdropRef}
    >
      <div
        className={`${styles.modal} ${isAnimating ? styles.modalVisible : styles.modalHidden}`}
        ref={modalRef}
        style={getAnimationStyle()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
