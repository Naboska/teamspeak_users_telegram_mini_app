import { Cell, Section } from '@telegram-apps/telegram-ui';
import type { ReactNode } from 'react';

import './DisplayData.css';
import { ChannelUser } from '@/helpers/parse-ts-channels';

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  users: ChannelUser[];
}

export const DisplayData = ({ header, users }: DisplayDataProps) => (
  <Section header={header}>
    {users.map((item, index) => {
      return (
        <Cell
          key={index}
          className="display-data__line"
          subhead={item.name}
          before={
            <img
              src={`https://static.tsviewer.com/images/ts3/viewer/default_mono_2014/client_${item.mic}.png`}
              width={16}
              height={16}
              alt={item.mic}
            />
          }
          after={<img src={`https://static.tsviewer.com/images/ts3/flags/${item.flag}.png`} alt={item.flag} />}
          readOnly
        />
      );
    })}
  </Section>
);
