import ArrowTurnDownRight48Regular from '~icons/fluent/arrow-turn-down-right-48-regular';
import ArrowDown16Regular from '~icons/fluent/arrow-down-16-regular';
import ArrowUp16Regular from '~icons/fluent/arrow-up-16-regular';
import './SearchFooter.css';

export default function SearchFooter() {
  return (
    <>
      <div className="search-footer-shortcuts">
        <div className="search-footer-shortcut">
          <kbd className="search-footer-kbd">
            <ArrowTurnDownRight48Regular width={16} height={16} />
          </kbd>
          <span>select</span>
        </div>
        <div className="search-footer-shortcut">
          <kbd className="search-footer-kbd">
            <ArrowDown16Regular width={16} height={16} />
          </kbd>
          <kbd className="search-footer-kbd">
            <ArrowUp16Regular width={16} height={16} />
          </kbd>
          <span>navigate</span>
        </div>
        <div className="search-footer-shortcut">
          <kbd className="search-footer-kbd">esc</kbd>
          <span>close</span>
        </div>
      </div>
      <div className="search-footer-branding">
        <small>Powered by</small>
        <a href="https://orama.com/" target="_blank" rel="noopener noreferrer">
          <img
            className="orama-logo-light"
            src="https://website-assets.oramasearch.com/orama-when-light.svg"
            alt="Orama logo"
          />
          <img
            className="orama-logo-dark"
            src="https://website-assets.oramasearch.com/orama-when-dark.svg"
            alt="Orama logo"
          />
        </a>
      </div>
    </>
  );
}
