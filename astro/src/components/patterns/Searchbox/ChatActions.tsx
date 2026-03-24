import { ChatInteractions } from '@orama/ui/components';
import ArrowSync20Regular from '~icons/fluent/arrow-sync-20-regular';
import Checkmark16Regular from '~icons/fluent/checkmark-16-regular';
import Copy16Regular from '~icons/fluent/copy-16-regular';
import ThumbDislike16Regular from '~icons/fluent/thumb-dislike-16-regular';
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
          <ArrowSync20Regular width={18} height={18} />
        </ChatInteractions.RegenerateLatest>
      </li>
      <li>
        <ChatInteractions.CopyMessage interaction={interaction} className="chat-action">
          {(copied: boolean) =>
            copied ? (
              <>
                <Checkmark16Regular width={18} height={18} />
                <span className="sr-only">Copied</span>
              </>
            ) : (
              <>
                <Copy16Regular width={18} height={18} />
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
          <ThumbDislike16Regular width={18} height={18} />
        </button>
      </li>
    </ul>
  );
}
