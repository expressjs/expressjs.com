import { FacetTabs, SearchInput, SearchResults } from '@orama/ui/components';
import type { Hit } from '@orama/core';
import SearchNoResults from './SearchNoResults';
import './Search.css';
import { Icon } from '@iconify/react';
import { useSearch } from '@orama/ui/hooks/useSearch';

type DocDocument = {
  title: string;
  description?: string;
  category?: string;
  path?: string;
  content?: string;
  version?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  'menu.docs': 'Docs',
  'menu.api': 'API',
  'menu.resources': 'Resources',
  'menu.blog': 'Blog',
};

function getPathBreadcrumb(path: string, category: string): string {
  const rootLabel = CATEGORY_LABELS[category] ?? category;
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
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const {
    context: { searchTerm, selectedFacet },
  } = useSearch();

  return (
    <>
      <SearchResults.Loading className="search-loading">
        <span>Searching...</span>
      </SearchResults.Loading>

      <SearchNoResults />
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
                // tabIndex={isSearchMode ? 0 : -1}
                // aria-hidden={!isSearchMode}
                className={`search-tab ${isSelected ? 'search-tab--selected' : ''}`}
              >
                {group.name}
                <span className="search-tab-count">({group.count})</span>
              </FacetTabs.Item>
            </>
          )}
        </FacetTabs.List>
      </FacetTabs.Wrapper>

      <SearchResults.GroupsWrapper groupBy="category" className="search-results-wrapper">
        {(group) => (
          <div key={group.name} className="search-results-group">
            <h2 className="search-results-group-title">{group.name}</h2>
            <SearchResults.GroupList group={group} className="search-results-list">
              {(result: Hit) => {
                const document = result.document as DocDocument;
                return (
                  <a href={document?.path || '#'} className="search-result-link">
                    <Icon icon="fluent:document-20-regular" width={20} height={20} />
                    <div>
                      <p className="search-result-breadcrumb">
                        {getPathBreadcrumb(document?.path ?? '', document?.category ?? '')}
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
          <SearchInput.Wrapper className="search-input-wrapper">
            <Icon
              icon="fluent:search-16-regular"
              width={18}
              height={18}
              className="search-input-icon"
            />
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
          </SearchInput.Wrapper>
        </SearchInput.Form>
      </SearchInput.Provider>
    </>
  );
}
