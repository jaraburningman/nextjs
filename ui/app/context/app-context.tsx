'use client'
import React, { createContext, useContext, useState, useRef } from "react";

type AppContextType = {
  detectionIntervalRef: React.MutableRefObject<any>;
}

export const AppContext = createContext<AppContextType>({
  detectionIntervalRef: { current: undefined }
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const detectionIntervalRef = useRef<any>(undefined);
  return (
    <AppContext value={{ detectionIntervalRef }}>
      {children}
    </AppContext>
  );
}
