import { useEffect, useState } from 'react';
import { OramaCloud } from '@orama/core';
import { ChatRoot, Modal, SearchRoot } from '@orama/ui/components';
import './orama-styles.css';
import { Icon } from '@iconify/react';
import SearchModal from './SearchModal';
import './SearchTrigger.css';
import './Search.css';

const orama = import.meta.env.PUBLIC_ORAMA_PROJECT_ID
  ? new OramaCloud({
      projectId: import.meta.env.PUBLIC_ORAMA_PROJECT_ID,
      apiKey: import.meta.env.PUBLIC_ORAMA_API_KEY,
    })
  : null;

interface SearchTriggerProps {
  placeholder: string;
  ariaLabel: string;
}

export default function SearchTrigger({ placeholder, ariaLabel }: SearchTriggerProps) {
  const [shortcutKey, setShortcutKey] = useState('⌘ K');

  useEffect(() => {
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
            <Icon icon="fluent:search-sparkle-16-regular" width={20} height={20} />
          </div>
          <span>{placeholder}</span>
        </div>
        <div className="search-trigger-shortcut">
          <span className="shortcut-key">{shortcutKey}</span>
        </div>
      </Modal.Trigger>

      {orama && (
        <Modal.Wrapper closeOnEscape closeOnOutsideClick className="search-modal-overlay">
          <SearchRoot client={orama}>
            <ChatRoot client={orama} askOptions={{ throttle_delay: 50 }}>
              <Modal.Inner className="search-modal-inner">
                <Modal.Content className="search-modal-content">
                  <SearchModal placeholder={placeholder} />
                </Modal.Content>
              </Modal.Inner>
            </ChatRoot>
          </SearchRoot>
        </Modal.Wrapper>
      )}
    </Modal.Root>
  );
}
