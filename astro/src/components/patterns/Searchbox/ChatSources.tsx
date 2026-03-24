import type { Interaction, AnyObject } from '@orama/core';
import { ChatInteractions } from '@orama/ui/components';
import type { FC } from 'react';
import Link20Regular from '~icons/fluent/link-20-regular';
import './ChatSources.css';

type ChatSourcesProps = {
  interaction: Interaction;
};

export const ChatSources: FC<ChatSourcesProps> = ({ interaction }) => {
  if (!interaction?.sources) {
    return null;
  }

  return (
    <div className="chat-sources-scroll-container">
      <ChatInteractions.Sources interaction={interaction} className="chat-sources" itemClassName="">
        {(document: AnyObject, index: number) => (
          <div className="chat-sources-item" key={index}>
            {!!document.title && typeof document.title === 'string' && (
              <a
                href={document.path as string}
                className="chat-sources-link"
                data-focus-on-arrow-nav
              >
                <h3 className="chat-sources-title">
                  <Link20Regular width={16} height={16} />
                  {(document.title as string).slice(0, 30) || ''}
                  {(document.title as string).length > 30 ? '...' : ''}
                </h3>
                <p className="chat-sources-excerpt">
                  {(document.content as string).slice(0, 60)}
                  ...
                </p>
              </a>
            )}
          </div>
        )}
      </ChatInteractions.Sources>
    </div>
  );
};
