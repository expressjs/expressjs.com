import { useEffect, useRef } from 'react';
import { ChatInteractions, PromptTextArea } from '@orama/ui/components';
import { useChat } from '@orama/ui/hooks/useChat';
import { useScrollableContainer } from '@orama/ui/hooks/useScrollableContainer';
import { Icon } from '@iconify/react';
import ChatActions from './ChatActions';
import './Chat.css';
import { ChatSources } from './ChatSources';

interface ChatProps {
  initialPrompt?: string;
  onBack: () => void;
}

export default function Chat({ initialPrompt }: ChatProps) {
  const { ask, loading } = useChat({ throttle_delay: 50 });
  const hasSentInitial = useRef(false);
  const { containerRef, scrollToBottom, recalculateGoToBottomButton, showGoToBottomButton } =
    useScrollableContainer();

  useEffect(() => {
    if (initialPrompt && !hasSentInitial.current) {
      hasSentInitial.current = true;
      ask({ query: initialPrompt });
    }
  }, [initialPrompt]);

  return (
    <div className="chat-container">
      <div
        ref={containerRef}
        className="chat-container-inner"
        onScroll={recalculateGoToBottomButton}
      >
        <ChatInteractions.Wrapper
          className="chat-interactions"
          onStreaming={recalculateGoToBottomButton}
          onNewInteraction={() => scrollToBottom({ animated: true })}
        >
          {(interaction) => (
            <div className="chat-interaction">
              <ChatInteractions.UserPrompt className="chat-user-prompt">
                {interaction.query}
              </ChatInteractions.UserPrompt>
              <ChatInteractions.Loading interaction={interaction} className="chat-loading">
                <div className="chat-typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </ChatInteractions.Loading>
              <ChatInteractions.Error interaction={interaction} className="chat-error">
                <span>Something went wrong. Please try again.</span>
              </ChatInteractions.Error>
              <ChatSources interaction={interaction} />
              <ChatInteractions.AssistantMessage
                className="chat-assistant-message"
                markdownClassnames={{
                  h1: 'chat-title',
                  h2: 'chat-title',
                  pre: 'chat-code-block',
                }}
              >
                {interaction.response}
              </ChatInteractions.AssistantMessage>
              <ChatActions interaction={interaction} />
            </div>
          )}
        </ChatInteractions.Wrapper>
      </div>

      {showGoToBottomButton && (
        <button
          type="button"
          onClick={() => scrollToBottom({ animated: true })}
          className="chat-go-to-bottom"
          aria-label="Scroll to bottom"
        >
          <Icon icon="fluent:arrow-down-16-filled" width={16} height={16} />
        </button>
      )}

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
          abortContent={<Icon icon="fluent:pause-circle-48-regular" width={18} height={18} />}
          aria-label="Send message"
        >
          <Icon icon="fluent:send-16-filled" width={16} height={16} />
        </PromptTextArea.Button>
      </PromptTextArea.Wrapper>
    </div>
  );
}
