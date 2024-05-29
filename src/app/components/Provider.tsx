"use client";
import React, { ReactNode } from 'react';
import { GlobalStyles } from '@contentful/f36-components';
import { SDKProvider } from '@contentful/react-apps-toolkit';

interface ProviderProps {
    children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <SDKProvider>
      <GlobalStyles />
      {children}
    </SDKProvider>
  );
}
