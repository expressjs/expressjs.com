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
    <Tabs.Wrapper defaultTab="search">
      <div className="search-modal-header">
        <Tabs.List className="search-modal-tabs">
          <Tabs.Trigger tabId="search" className="search-modal-tab">
            Search
          </Tabs.Trigger>
          <Tabs.Trigger tabId="chat" className="search-modal-tab">
            Ask AI
          </Tabs.Trigger>
        </Tabs.List>
        <Modal.Close className="search-modal-close" aria-label="Close search">
          <Icon icon="fluent:dismiss-16-regular" width={20} height={20} />
        </Modal.Close>
      </div>

      <Tabs.Panel tabId="search" className="search-tab-panel">
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

        <SearchResults.Wrapper className="search-results-wrapper">
          <SearchResults.Loading className="search-loading">
            <span>Searching...</span>
          </SearchResults.Loading>

          <SearchResults.NoResults className="search-no-results">
            {(searchTerm) => (
              <span>
                No results for &ldquo;<strong>{searchTerm}</strong>&rdquo;
              </span>
            )}
          </SearchResults.NoResults>

          <SearchResults.List className="search-results-list" itemClassName="search-result-item">
            {(result: Hit<DocDocument>) => (
              <a href={result.document.url ?? '#'} className="search-result-link">
                {result.document.section && (
                  <span className="search-result-section">{result.document.section}</span>
                )}
                <span className="search-result-title">{result.document.title}</span>
              </a>
            )}
          </SearchResults.List>
        </SearchResults.Wrapper>
      </Tabs.Panel>

      <Tabs.Panel tabId="chat" className="chat-tab-panel">
        <ChatInteractions.Wrapper className="chat-interactions" aria-label="AI chat responses">
          {(interaction) => (
            <div className="chat-interaction">
              <ChatInteractions.UserPrompt className="chat-user-prompt" />
              <ChatInteractions.AssistantMessage className="chat-assistant-message" />
            </div>
          )}
        </ChatInteractions.Wrapper>

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
      </Tabs.Panel>
    </Tabs.Wrapper>
  );
}
