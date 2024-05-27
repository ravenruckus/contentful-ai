"use client";
import React, { useMemo } from 'react';
import { locations } from '@contentful/app-sdk';
import ConfigScreen from '@/components/locations/ConfigScreen';
import Dialog from '@/components/locations/Dialog';
import Sidebar from '@/components/locations/Sidebar';

import { useSDK } from '@contentful/react-apps-toolkit';

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_DIALOG]: Dialog,
  [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
};

const App = () => {
  const sdk = useSDK();

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location]);

  return Component ? <Component /> : null;
};

export default App;
