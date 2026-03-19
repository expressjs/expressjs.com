import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OramaCloud } from '@orama/core';
import { ChatRoot, Modal, SearchRoot } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';
import Search from './Search';
import './orama-styles.css';
import { Icon } from '@iconify/react';
import Chat from './Chat';
import SearchFooter from './SearchFooter';
import './Searchbox.css';

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
  onModeChange: (mode: 'search' | 'chat') => void;
}

function SearchModalHeader({ mode, onModeChange }: SearchModalHeaderProps) {
  const {
    context: { searchTerm },
    reset,
  } = useSearch();

  return (
    <div className="search-modal-header">
      <div className="search-modal-header-left">
        <div className="search-modal-tabs" role="tablist">
          <button
            className={`search-modal-tab${mode === 'search' ? ' active' : ''}`}
            role="tab"
            aria-selected={mode === 'search'}
            onClick={() => onModeChange('search')}
          >
            <Icon icon="fluent:search-16-regular" width={16} height={16} />
            Search
          </button>
          <button
            className={`search-modal-tab${mode === 'chat' ? ' active' : ''}`}
            role="tab"
            aria-selected={mode === 'chat'}
            onClick={() => onModeChange('chat')}
          >
            <Icon icon="fluent:chat-sparkle-16-regular" width={16} height={16} />
            Ask AI
          </button>
        </div>
      </div>
      <div className="search-modal-header-right">
        {mode === 'search' && searchTerm && (
          <>
            <button className="search-modal-clear" onClick={reset} aria-label="Clear search">
              Clear
            </button>
          </>
        )}
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
  const [lastChatTerm, setLastChatTerm] = useState<string | null>(null);

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
                    <SearchModalHeader mode={mode} onModeChange={setMode} />
                    <div className="search-modal-body">
                      <div style={{ display: mode === 'search' ? 'contents' : 'none' }}>
                        <Search
                          lang={lang}
                          placeholder="Start typing: What's new in Express 5?"
                          mode={mode}
                          onModeChange={setMode}
                          lastChatTerm={lastChatTerm}
                        />
                      </div>
                      {mode === 'chat' && (
                        <Chat lastChatTerm={lastChatTerm} onAutoAsk={setLastChatTerm} />
                      )}
                    </div>
                    <div className="search-modal-footer">
                      <SearchFooter />
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
