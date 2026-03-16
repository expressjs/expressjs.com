import { useEffect, useRef } from 'react';
import { ChatInteractions, PromptTextArea } from '@orama/ui/components';
import { useChat } from '@orama/ui/hooks/useChat';
import { Icon } from '@iconify/react';
import './Chat.css';

interface ChatProps {
  initialPrompt?: string;
  onBack: () => void;
}

export default function Chat({ initialPrompt }: ChatProps) {
  const { ask, loading } = useChat({ throttle_delay: 50 });
  const hasSentInitial = useRef(false);

  useEffect(() => {
    if (initialPrompt && !hasSentInitial.current) {
      hasSentInitial.current = true;
      ask({ query: initialPrompt });
    }
  }, [initialPrompt]);

  return (
    <div className="chat-container">
      <div className="chat-container-inner">
        <ChatInteractions.Wrapper className="chat-interactions">
          {(interaction) => (
            <div className="chat-interaction">
              <ChatInteractions.UserPrompt className="chat-user-prompt">
                {interaction.query}
              </ChatInteractions.UserPrompt>
              <ChatInteractions.AssistantMessage className="chat-assistant-message">
                {interaction.response}
              </ChatInteractions.AssistantMessage>
              <ChatInteractions.Loading interaction={interaction} className="chat-loading">
                <span>Thinking...</span>
              </ChatInteractions.Loading>
              <ChatInteractions.Error interaction={interaction} className="chat-error">
                <span>Something went wrong. Please try again.</span>
              </ChatInteractions.Error>
            </div>
          )}
        </ChatInteractions.Wrapper>
      </div>

      <PromptTextArea.Wrapper className="chat-input-wrapper">
        <Icon icon="fluent:sparkle-16-filled" width={16} height={16} className="chat-input-icon" />
        <PromptTextArea.Field
          className="chat-input-field"
          placeholder="Ask a question about Express..."
          rows={1}
        />
        <PromptTextArea.Button
          className="chat-input-button"
          isLoading={loading}
          aria-label="Send message"
        >
          <Icon icon="fluent:send-16-filled" width={16} height={16} />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
    </div>
  );
}
