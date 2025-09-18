'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalOpen = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
