import { List, Placeholder, Spinner } from '@telegram-apps/telegram-ui';
import { useMemo } from 'react';
import useInterval from 'react-use/esm/useInterval';

import { useServerInfo } from '@/services/api/use-server-info';
import { DisplayData } from '@/components/DisplayData';

export const HomePage = () => {
  const { channels, isLoading, refetch } = useServerInfo();

  useInterval(refetch, 60000);

  const usersCount = useMemo(() => {
    return channels.reduce((acc, channel) => acc + channel.users.length, 0);
  }, [channels]);

  if (isLoading) {
    return (
      <Placeholder description="Загрузка...">
        <Spinner size="l" />
      </Placeholder>
    );
  }

  if (!usersCount) {
    return (
      <Placeholder description="Нет пользователей">
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    );
  }

  return (
    <List>
      {channels.map((channel, index) => {
        if (!channel.users.length) return null;

        return <DisplayData key={index} header={channel.title} users={channel.users} />;
      })}
    </List>
  );
};
