import {
  ChatInteractions,
  Modal,
  PromptTextArea,
  SearchInput,
  SearchResults,
  Tabs,
} from '@orama/ui/components';
import type { Hit } from '@orama/core';
import { Icon } from '@iconify/react';

type DocDocument = {
  title: string;
  section?: string;
  url?: string;
  content?: string;
};

interface SearchModalProps {
  placeholder: string;
}

export default function SearchModal({ placeholder }: SearchModalProps) {
  return (
    <>
      <Modal.Close className="search-modal-close" aria-label="Close search">
        <Icon icon="fluent:dismiss-16-regular" width={20} height={20} />
      </Modal.Close>

      <SearchResults.Wrapper className="search-results-wrapper">
        <SearchResults.Loading className="search-loading">
          <span>Searching...</span>
        </SearchResults.Loading>

        <SearchResults.NoResults className="search-no-results">
          {(searchTerm) => (
            <>
              {searchTerm ? (
                <span>
                  No results for &ldquo;<strong>{searchTerm}</strong>&rdquo;
                </span>
              ) : (
                <span>Initial content...</span>
              )}
            </>
          )}
        </SearchResults.NoResults>

        <SearchResults.List className="search-results-list" itemClassName="search-result-item">
          {(result) => {
            const doc = (result as Hit<DocDocument>).document;
            return (
              <a href={doc.url ?? '#'} className="search-result-link">
                {doc.section && <span className="search-result-section">{doc.section}</span>}
                <span className="search-result-title">{doc.title}</span>
              </a>
            );
          }}
        </SearchResults.List>
      </SearchResults.Wrapper>

      <ChatInteractions.Wrapper className="chat-interactions" aria-label="AI chat responses">
        {(interaction) => (
          <div className="chat-interaction">
            <ChatInteractions.UserPrompt className="chat-user-prompt">
              {interaction.query}
            </ChatInteractions.UserPrompt>
            <ChatInteractions.AssistantMessage className="chat-assistant-message">
              {interaction.response}
            </ChatInteractions.AssistantMessage>
          </div>
        )}
      </ChatInteractions.Wrapper>

      <SearchInput.Provider>
        <SearchInput.Wrapper className="search-input-wrapper">
          <SearchInput.Form className="search-input-form">
            <SearchInput.Input
              className="search-input-field"
              placeholder={placeholder}
              searchOnType
            />
          </SearchInput.Form>
        </SearchInput.Wrapper>
      </SearchInput.Provider>

      <div className="chat-input-area">
        <PromptTextArea.Wrapper className="chat-prompt-wrapper">
          <PromptTextArea.Field
            className="chat-prompt-field"
            placeholder="Ask a question about Express..."
            rows={1}
          />
          <PromptTextArea.Button className="chat-prompt-button" />
        </PromptTextArea.Wrapper>
      </div>
    </>
  );
}
