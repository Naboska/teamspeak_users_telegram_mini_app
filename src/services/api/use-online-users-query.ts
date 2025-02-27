import { QueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { apiClient } from '@/services/helpers/api-client';

export type OnlineUsersResponse = {
  response: {
    items: OnlineUser[];
  };
};

export type OnlineUser = {
  name: string;
  avatar: string;
  lastOnline: number;
  lastSessionTime: number;
  created: number;
};

export const ONLINE_USERS_QUERY_KEY = ['/players'];

export const useOnlineUsersQuery = (
  config?: Omit<QueryOptions<AxiosResponse<OnlineUsersResponse>>, 'queryKey' | 'queryFn'>
) => {
  const { data, ...rest } = useQuery<AxiosResponse<OnlineUsersResponse>>({
    ...config,
    queryKey: ONLINE_USERS_QUERY_KEY,
    queryFn: () => apiClient.get<OnlineUsersResponse>('/players'),
  });

  return {
    ...rest,
    users: data?.data.response.items ?? [],
  };
};
