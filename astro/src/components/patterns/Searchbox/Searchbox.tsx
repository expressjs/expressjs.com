import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OramaCloud } from '@orama/core';
import { ChatRoot, Modal, SearchRoot } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';
import Search from './Search';
import './orama-styles.css';
import { Icon } from '@iconify/react';
import './Searchbox.css';
import Chat from './Chat';

const orama = import.meta.env.PUBLIC_ORAMA_PROJECT_ID
  ? new OramaCloud({
      projectId: import.meta.env.PUBLIC_ORAMA_PROJECT_ID,
      apiKey: import.meta.env.PUBLIC_ORAMA_API_KEY,
    })
  : null;

interface SearchboxProps {
  lang: string;
  placeholder: string;
  ariaLabel: string;
}

interface SearchModalHeaderProps {
  mode: 'search' | 'chat';
  enableSearch: () => void;
}

function SearchModalHeader({ mode, enableSearch }: SearchModalHeaderProps) {
  const {
    context: { searchTerm },
    reset,
  } = useSearch();

  return (
    <div className="search-modal-header">
      <div className="search-modal-header-left">
        {mode === 'chat' && (
          <button className="search-modal-back" onClick={enableSearch} aria-label="Back to search">
            <Icon icon="fluent:arrow-left-16-regular" width={16} height={16} />
            Back
          </button>
        )}
        {mode === 'search' && searchTerm && (
          <>
            <button className="search-modal-back" onClick={reset} aria-label="Clear search">
              Clear
            </button>
          </>
        )}
      </div>
      <div>
        <Modal.Close className="search-modal-close" aria-label="Close search">
          <Icon icon="fluent:dismiss-16-regular" width={18} height={18} />
        </Modal.Close>
      </div>
    </div>
  );
}

export default function Searchbox({ lang, placeholder, ariaLabel }: SearchboxProps) {
  const [shortcutKey, setShortcutKey] = useState('⌘ K');
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'search' | 'chat'>('search');

  useEffect(() => {
    setMounted(true);
    const nav = navigator as Navigator & { userAgentData?: { platform: string } };
    const isMac = nav.userAgentData?.platform
      ? /mac/i.test(nav.userAgentData.platform)
      : /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
    setShortcutKey(isMac ? '⌘ K' : 'Ctrl K');
  }, []);

  return (
    <SearchRoot client={orama}>
      <ChatRoot client={orama} askOptions={{ throttle_delay: 50 }}>
        <Modal.Root>
          <Modal.Trigger
            className="search-trigger"
            enableCmdK
            disabled={!orama}
            aria-label={ariaLabel}
          >
            <div className="search-trigger-content">
              <div className="search-trigger-icon">
                <Icon icon="fluent:search-sparkle-16-regular" width={18} height={18} />
              </div>
              <span>{placeholder}</span>
            </div>
            <div className="search-trigger-shortcut">
              <span className="shortcut-key">{shortcutKey}</span>
            </div>
          </Modal.Trigger>

          {orama &&
            mounted &&
            createPortal(
              <Modal.Wrapper closeOnEscape closeOnOutsideClick className="search-modal-overlay">
                <Modal.Inner className="search-modal-inner">
                  <Modal.Content className="search-modal-content">
                    <SearchModalHeader mode={mode} enableSearch={() => setMode('search')} />
                    <div className="search-modal-body">
                      <div style={{ display: mode === 'search' ? 'contents' : 'none' }}>
                        <Search
                          lang={lang}
                          placeholder="Start typing: What's new in Express 5?"
                          mode={mode}
                          onModeChange={setMode}
                        />
                      </div>
                      {mode === 'chat' && <Chat />}
                    </div>

                    <div className="search-modal-footer">
                      <small>Powered by</small>
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
                    </div>
                  </Modal.Content>
                </Modal.Inner>
              </Modal.Wrapper>,
              document.body
            )}
        </Modal.Root>
      </ChatRoot>
    </SearchRoot>
  );
}
