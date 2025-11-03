'use client'
import React, {createContext, useState} from "react";

type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export const HeaderContext = createContext<HeaderContextType>({
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {}
});

// Provider component that manages the shared state
export function HeaderProvider({ children }: {children: React.ReactNode}) {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");

  return (
    <HeaderContext value={{title, setTitle, description, setDescription}}>
      {children}
    </HeaderContext>
  );
}
