import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OramaCloud } from '@orama/core';
import { ChatRoot, Modal, SearchRoot } from '@orama/ui/components';
import { useSearch } from '@orama/ui/hooks/useSearch';
import Search from './Search';
import SearchSparkle16Regular from '~icons/fluent/search-sparkle-16-regular';
import ArrowLeft24Regular from '~icons/fluent/arrow-left-24-regular';
import Dismiss16Regular from '~icons/fluent/dismiss-16-regular';
import Chat from './Chat';
import SearchFooter from './SearchFooter';
import './orama-styles.css';
import './Searchbox.css';
import { useChat } from '@orama/ui/hooks/index';

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
  const {
    context: { interactions },
  } = useChat();

  function handleBackToSearch() {
    if (mode === 'chat') {
      onModeChange('search');
      return;
    }

    reset();
  }

  return (
    <div className="search-modal-header">
      <div className="search-modal-header-left">
        {(mode === 'chat' || searchTerm) && (
          <button
            className="search-modal-back"
            role="tab"
            type="button"
            aria-label="Back to search"
            onClick={handleBackToSearch}
          >
            <ArrowLeft24Regular width={16} height={16} />
          </button>
        )}
        {interactions && interactions.length > 0 && (
          <button className="search-modal-chat" role="tab" onClick={() => onModeChange('chat')}>
            <span className="chat-interactions-count">{interactions.length}</span>
            <span className="chat-user-prompt-preview">
              question{interactions.length > 1 ? 's' : ''}
            </span>
          </button>
        )}
      </div>
      <div className="search-modal-header-right">
        <Modal.Close className="search-modal-close" aria-label="Close search">
          <Dismiss16Regular width={18} height={18} />
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
                <SearchSparkle16Regular width={18} height={18} />
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
                      <div className={mode === 'search' ? 'contents' : 'hidden'}>
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
