import { SearchResults, Suggestions } from '@orama/ui/components';
import { Icon } from '@iconify/react';
import './SearchNoResults.css';

const SUGGESTIONS = [
  'Can you give me a guide to install Express.js',
  'What are the advantages of version 5',
  'What are Express Superpowers',
];

interface SearchNoResultsProps {
  onSuggestionClick?: (text: string) => void;
}

export default function SearchNoResults({ onSuggestionClick }: SearchNoResultsProps) {
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
                <img
                  src="/logo-express-white.svg"
                  alt=""
                  className="search-empty-image search-empty-image--dark"
                />
                <img
                  src="/logo-express-black.svg"
                  alt=""
                  className="search-empty-image search-empty-image--light"
                />
              </div>
              <p>What would you like to know about Express and its features?</p>
              <Suggestions.Wrapper className="search-suggestions">
                <ul>
                  {SUGGESTIONS.map((text) => (
                    <li key={text}>
                      <Suggestions.Item
                        onClick={() => onSuggestionClick?.(text)}
                        className="search-suggestion__item"
                      >
                        <Icon icon="fluent:sparkle-20-filled" width={20} height={20} />
                        {text}
                      </Suggestions.Item>
                    </li>
                  ))}
                </ul>
              </Suggestions.Wrapper>
            </>
          )}
        </>
      )}
    </SearchResults.NoResults>
  );
}
