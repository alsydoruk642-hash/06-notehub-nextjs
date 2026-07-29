'use client';
import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import type { MouseEvent, ReactNode } from 'react';

interface ModalProps {
  closeFunction: () => void;
  children: ReactNode;
}
export default function Modal({ closeFunction, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFunction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeFunction]);
  const handleModalClick = (event: MouseEvent) => {
    event.stopPropagation();
  };
  const handleBackdropClick = () => {
    closeFunction();
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal} onClick={handleModalClick}>
        {children}
      </div>
    </div>,
    document.body
  );
}
