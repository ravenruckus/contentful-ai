import { Button } from '@contentful/f36-components';
import { type CoreMessage } from 'ai';
import { useSDK, useAutoResizer } from '@contentful/react-apps-toolkit';
import { FieldAppSDK } from '@contentful/app-sdk';

interface SaveButtonProps {
    messages: CoreMessage[];
    isDisabled: boolean;
}

const SaveButton = (props: SaveButtonProps) => {
    const sdk = useSDK<FieldAppSDK>();
    useAutoResizer();

    const handleClicks = async () => {
        try {
            const assistantMessages = props.messages.filter((m: CoreMessage) => m.role === 'assistant');
            const lastMessage = assistantMessages && assistantMessages[assistantMessages.length - 1].content;
            if (!lastMessage) {
                return;
            }
            const byLine = sdk.entry.fields['AiByline']
            await byLine.setValue(lastMessage);
            await sdk.entry.save();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Button onClick={handleClicks} variant='primary' isDisabled={props.isDisabled}>
           Insert byline into byline field
        </Button>
        
    )

}

export default SaveButton;