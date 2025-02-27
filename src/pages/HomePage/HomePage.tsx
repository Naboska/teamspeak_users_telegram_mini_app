import { List, Placeholder, Spinner } from '@telegram-apps/telegram-ui';
import { useMemo } from 'react';

import { useOnlineUsersQuery } from '@/services/api/use-online-users-query';
import { DisplayData } from '@/components/DisplayData';

export const HomePage = () => {
  const { users, isLoading } = useOnlineUsersQuery();

  const userRows = useMemo(() => {
    return users.map(user => ({ value: user.name }));
  }, [users]);

  if (isLoading) {
    return (
      <Placeholder description="Загрузка...">
        <Spinner size="l" />
      </Placeholder>
    );
  }

  if (!users.length) {
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
      <DisplayData rows={userRows} />
    </List>
  );
};
