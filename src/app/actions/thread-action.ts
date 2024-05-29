'use server';
import { createOpenAI } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { streamText, CoreMessage } from 'ai';

const openai = createOpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function threadAction(messages: CoreMessage[]) {
  try {
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        { role: 'system', content: 'You are an expert byline writer for websites. Do not use quotes. Keep responses under 30 words.' },
        ...messages,
      ]
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
  } catch (error) {
    console.error(error);
  }
}

export default threadAction;
