import { SearchResults, Suggestions } from '@orama/ui/components';
import { Icon } from '@iconify/react/dist/offline';
import ExpressLogoWhite from '../../../icons/logo-express-white.svg?react';
import ExpressLogoBlack from '../../../icons/logo-express-black.svg?react';
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
                <ExpressLogoWhite className="search-empty-image search-empty-image--dark" aria-hidden />
                <ExpressLogoBlack className="search-empty-image search-empty-image--light" aria-hidden />
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
