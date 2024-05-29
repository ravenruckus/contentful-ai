'use client';

import { type CoreMessage } from 'ai';
import { useState } from 'react';
import { TextInput, Text, Stack } from '@contentful/f36-components'
import threadAction from '@/app//actions/thread-action';
import { readStreamableValue } from 'ai/rsc';
import SaveButton from '@/app/components/sidebar/save-button/save-button';

export default function Thread() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState('');
  const [shouldDisable, setShouldDisable] = useState(true);
  return (
    <Stack flexDirection="column" alignItems="start">
      {messages.map((m, i) => (
        <Text key={i} fontSize="fontSizeM" lineHeight="lineHeightM">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content as string}
        </Text>
      ))}

      <form
        action={async () => {
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: 'user' },
          ];

          setMessages(newMessages);
          setInput('');

          const result = await threadAction(newMessages);

          if (!result) {
            return;
          }
          for await (const content of readStreamableValue(result)) {
            setMessages([
              ...newMessages,
              {
                role: 'assistant',
                content: content as string,
              },
            ]);
          }
          setShouldDisable(false);
        }}
      >
        <TextInput 
          value={input}
          placeholder="Type your prompt here..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <SaveButton messages={messages} isDisabled={shouldDisable} />
    </Stack>
  );
}