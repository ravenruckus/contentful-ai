"use client";
import { SidebarAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { SectionHeading, Stack, Text } from '@contentful/f36-components';
import Thread from '@/app/components/sidebar/thread-form';

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>();

  return (
    <Stack flexDirection="column" alignItems="start">
      <SectionHeading marginBottom='none'>Generate Byline</SectionHeading>
      <Text marginBottom='spacingS' as='i'>Hint: State the length you would like the byline to be.</Text>
      <Thread />
    </Stack>
  )
};

export default Sidebar;
