import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { OramaCloud } from '@orama/core';
import { ChatRoot, Modal, SearchRoot } from '@orama/ui/components';
import Search from './Search';
import './orama-styles.css';
import { Icon } from '@iconify/react';
import './Searchbox.css';

const orama = import.meta.env.PUBLIC_ORAMA_PROJECT_ID
  ? new OramaCloud({
      projectId: import.meta.env.PUBLIC_ORAMA_PROJECT_ID,
      apiKey: import.meta.env.PUBLIC_ORAMA_API_KEY,
    })
  : null;

interface SearchboxProps {
  placeholder: string;
  ariaLabel: string;
}

export default function Searchbox({ placeholder, ariaLabel }: SearchboxProps) {
  const [shortcutKey, setShortcutKey] = useState('⌘ K');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const nav = navigator as Navigator & { userAgentData?: { platform: string } };
    const isMac = nav.userAgentData?.platform
      ? /mac/i.test(nav.userAgentData.platform)
      : /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
    setShortcutKey(isMac ? '⌘ K' : 'Ctrl K');
  }, []);

  return (
    <Modal.Root>
      <Modal.Trigger className="search-trigger" enableCmdK disabled={!orama} aria-label={ariaLabel}>
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
            <SearchRoot client={orama}>
              <ChatRoot client={orama} askOptions={{ throttle_delay: 50 }}>
                <Modal.Inner className="search-modal-inner">
                  <Modal.Content className="search-modal-content">
                    <div className="search-modal-header">
                      <Modal.Close className="search-modal-close" aria-label="Close search">
                        <Icon icon="fluent:dismiss-16-regular" width={18} height={18} />
                      </Modal.Close>
                    </div>
                    <div className="search-modal-body">
                      <Search placeholder="Search or ask: What's new in Express 5?" />
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
              </ChatRoot>
            </SearchRoot>
          </Modal.Wrapper>,
          document.body
        )}
    </Modal.Root>
  );
}
