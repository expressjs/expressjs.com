import { useEffect, useRef, useState } from 'react';
import { FacetTabs, SearchInput, SearchResults } from '@orama/ui/components';
import type { Hit } from '@orama/core';
import SearchNoResults from './SearchNoResults';
import './Search.css';
import Document20Regular from '~icons/fluent/document-20-regular';
import Search16Regular from '~icons/fluent/search-16-regular';
import Sparkle16Filled from '~icons/fluent/sparkle-16-filled';
import { useSearch } from '@orama/ui/hooks/useSearch';
import { useTranslations } from '@/i18n/utils';
import type { ui } from '@/i18n/locales';
import { useChat } from '@orama/ui/hooks/useChat';

type DocDocument = {
  title: string;
  description?: string;
  category?: string;
  path?: string;
  content?: string;
  version?: string;
};

function getPathBreadcrumb(path: string, category: string, t: (key: string) => string): string {
  const rootLabel = t(category);
  const categorySlug = rootLabel.toLowerCase();

  const segments = path
    .split('/')
    .filter(Boolean)
    .slice(1) // remove language prefix (e.g., 'en')
    .filter((s) => s !== categorySlug) // remove redundant category segment
    .slice(0, -1) // remove last segment (the document page itself)
    .map((s) =>
      s
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );

  return [rootLabel, ...segments].join(' > ');
}

interface SearchProps {
  lang: string;
  placeholder: string;
  mode: 'search' | 'chat';
  onModeChange: (mode: 'search' | 'chat') => void;
}

export default function Search({ lang, placeholder, mode, onModeChange }: SearchProps) {
  const t = useTranslations(lang as keyof typeof ui);
  const {
    context: { searchTerm, selectedFacet },
  } = useSearch();
  const { ask } = useChat();
  const [lastChatTerm, setLastChatTerm] = useState<string>();

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'search') {
      const id = setTimeout(() => {
        inputWrapperRef.current?.querySelector('input')?.focus();
      }, 50);
      return () => clearTimeout(id);
    }
  }, [mode]);

  const enterChat = () => {
    onModeChange('chat');
    setLastChatTerm(searchTerm);
    ask({ query: searchTerm ?? '' });
  };

  return (
    <>
      <SearchResults.Loading className="search-loading">
        {[65, 80, 50].map((w) => (
          <div key={w} className="search-skeleton-item">
            <div className="search-skeleton-icon" />
            <div className="search-skeleton-text">
              <div
                className="search-skeleton-line search-skeleton-line--title"
                style={{ width: `${w}%` }}
              />
              <div
                className="search-skeleton-line search-skeleton-line--desc"
                style={{ width: `${w - 15}%` }}
              />
            </div>
          </div>
        ))}
      </SearchResults.Loading>

      <SearchNoResults onSuggestionClick={enterChat} />
      <div className="search-tabs-scroll-container">
        <FacetTabs.Wrapper>
          <FacetTabs.List className="search-tabs">
            {(group, isSelected) => (
              <>
                <FacetTabs.Item
                  isSelected={group.name === selectedFacet}
                  group={group}
                  filterBy="category"
                  searchParams={{
                    term: searchTerm ?? '',
                  }}
                  className={`search-tab ${isSelected ? 'search-tab--selected' : ''}`}
                >
                  {t(group.name)}
                  <span className="search-tab-count">({group.count})</span>
                </FacetTabs.Item>
              </>
            )}
          </FacetTabs.List>
        </FacetTabs.Wrapper>
      </div>

      <SearchResults.GroupsWrapper groupBy="category" className="search-results-wrapper">
        {(group) => (
          <div key={group.name} className="search-results-group">
            <h2 className="search-results-group-title">{t(group.name)}</h2>
            <SearchResults.GroupList group={group} className="search-results-list">
              {(result: Hit) => {
                const document = result.document as DocDocument;
                return (
                  <a
                    href={document?.path || '#'}
                    className="search-result-link"
                    data-focus-on-arrow-nav
                  >
                    <Document20Regular width={20} height={20} />
                    <div>
                      <p className="search-result-breadcrumb">
                        {getPathBreadcrumb(document?.path ?? '', document?.category ?? '', t)}
                      </p>
                      <h3 className="search-result-title">{document?.title}</h3>
                      {document?.description && (
                        <p className="search-result-description">{document.description}</p>
                      )}
                    </div>
                  </a>
                );
              }}
            </SearchResults.GroupList>
          </div>
        )}
      </SearchResults.GroupsWrapper>

      <SearchInput.Provider>
        <SearchInput.Form className="search-input-form">
          <SearchInput.Wrapper className="search-input-wrapper" ref={inputWrapperRef}>
            <Search16Regular width={18} height={18} className="search-input-icon" />
            <SearchInput.Input
              className="search-input-field"
              placeholder={placeholder}
              searchOnType
              searchParams={{
                groupBy: {
                  properties: ['category'],
                },
                facets: {
                  category: {},
                },
              }}
            />
            <button
              className="search-ask-button"
              onClick={() => enterChat()}
              disabled={!searchTerm || searchTerm === lastChatTerm}
              type="submit"
              aria-label="Switch to chat mode"
            >
              <Sparkle16Filled width={14} height={14} />
              Get summary
            </button>
          </SearchInput.Wrapper>
        </SearchInput.Form>
      </SearchInput.Provider>
    </>
  );
}
