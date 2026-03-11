import { SearchInput, SearchResults } from '@orama/ui/components';
import type { Hit } from '@orama/core';
import SearchNoResults from './SearchNoResults';
import './Search.css';

type DocDocument = {
  title: string;
  description?: string;
  path?: string;
  content?: string;
};

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  return (
    <>
      <SearchResults.Wrapper className="search-results-wrapper">
        <SearchResults.Loading className="search-loading">
          <span>Searching...</span>
        </SearchResults.Loading>

        <SearchNoResults />

        <SearchResults.List className="search-results-list" itemClassName="search-result-item">
          {(result) => {
            const doc = (result as Hit<DocDocument>).document;
            return (
              <a href={doc.path ?? '#'} className="search-result-link">
                <h3 className="search-result-title">{doc.title}</h3>
                {doc.description && <p className="search-result-description">{doc.description}</p>}
              </a>
            );
          }}
        </SearchResults.List>
      </SearchResults.Wrapper>

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
    </>
  );
}
