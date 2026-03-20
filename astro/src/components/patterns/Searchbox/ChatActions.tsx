import { ChatInteractions } from '@orama/ui/components';
import { Icon } from '@iconify/react/dist/offline';
import './ChatActions.css';
import { useState } from 'react';

interface ChatActionsProps {
  interaction: Parameters<Parameters<typeof ChatInteractions.Wrapper>[0]['children']>[0];
}

export default function ChatActions({ interaction }: ChatActionsProps) {
  const [disliked, setDisliked] = useState(false);

  const dislikeMessage = () => {
    setDisliked(true);
  };

  if (interaction.loading) {
    return null;
  }

  return (
    <ul className="chat-actions">
      <li>
        <ChatInteractions.RegenerateLatest interaction={interaction} className="chat-action">
          <Icon icon="fluent:arrow-sync-20-regular" width={18} height={18} />
        </ChatInteractions.RegenerateLatest>
      </li>
      <li>
        <ChatInteractions.CopyMessage interaction={interaction} className="chat-action">
          {(copied: boolean) =>
            copied ? (
              <>
                <Icon icon="fluent:checkmark-16-regular" width={18} height={18} />
                <span className="sr-only">Copied</span>
              </>
            ) : (
              <>
                <Icon icon="fluent:copy-16-regular" width={18} height={18} />
                <span className="sr-only">Copy</span>
              </>
            )
          }
        </ChatInteractions.CopyMessage>
      </li>
      <li>
        <button
          type="button"
          className={`chat-action ${disliked ? 'chat-action--disliked' : ''}`}
          aria-label="Upvote response"
          onClick={dislikeMessage}
        >
          <Icon icon="fluent:thumb-dislike-16-regular" width={18} height={18} />
        </button>
      </li>
    </ul>
  );
}
