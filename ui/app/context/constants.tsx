'use client'
import {createContext, useState} from "react";

type ConstantsContextType = {
  [key: string]: string;
}

export const ConstantsContext = createContext<ConstantsContextType>();

// Provider component that manages the shared state
export function ConstantsProvider({ children }) {

  const constants = {

  }

  return (
    <ConstantsContext value={{constants}}>
      {children}
    </ConstantsContext>
  );
}