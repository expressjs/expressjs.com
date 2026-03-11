import { SearchResults, Suggestions } from '@orama/ui/components';
import { Icon } from '@iconify/react';
import './SearchNoResults.css';

export default function SearchNoResults() {
  return (
    <SearchResults.NoResults className="search-no-results">
      {(searchTerm) => (
        <>
          {searchTerm ? (
            <span>
              No results for &ldquo;<strong>{searchTerm}</strong>&rdquo;
            </span>
          ) : (
            <>
              <div className="search-image-wrapper">
                <img src="/logo-express-white.svg" alt="" className="search-empty-image search-empty-image--dark" />
                <img src="/logo-express-black.svg" alt="" className="search-empty-image search-empty-image--light" />
              </div>
              <Suggestions.Wrapper className="search-suggestions">
                <ul>
                  {/* TODO: placeholder suggestions, to be replaced */}
                  <li>
                    <Suggestions.Item onClick={() => {}} className="search-suggestion__item">
                      <Icon icon="fluent:sparkle-20-filled" width={20} height={20} />
                      Can you give me a guide to install Express.js
                    </Suggestions.Item>
                  </li>
                  <li>
                    <Suggestions.Item onClick={() => {}} className="search-suggestion__item">
                      <Icon icon="fluent:sparkle-20-filled" width={20} height={20} />
                      What are the advantages of version 5
                    </Suggestions.Item>
                  </li>
                  <li>
                    <Suggestions.Item onClick={() => {}} className="search-suggestion__item">
                      <Icon icon="fluent:sparkle-20-filled" width={20} height={20} />
                      What are Express Superpowers
                    </Suggestions.Item>
                  </li>
                </ul>
              </Suggestions.Wrapper>
            </>
          )}
        </>
      )}
    </SearchResults.NoResults>
  );
}
