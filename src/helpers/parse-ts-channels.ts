export type ChannelUser = {
  mic: 'mic_muted' | 'snd_muted' | 'idle';
  name: string;
  flag: string;
};

export type Channel = {
  title: string;
  users: ChannelUser[];
};

const createChannel = (element: Element): Channel => ({
  title: element.textContent ?? '',
  users: [],
});

const createUser = (element: Element): ChannelUser => {
  const content = element.querySelector('.tsv_content');
  const name = content?.querySelector('a')?.textContent ?? '';
  const micElement = content?.querySelector('i');
  const mic = micElement?.getAttribute('class')?.split('client_')[1] ?? 'snd_muted';
  const flag = element?.querySelector('i.tsv_flag')?.getAttribute('title') ?? '';

  return {
    name,
    mic: mic as ChannelUser['mic'],
    flag: flag.toLowerCase(),
  };
};

export const parseTsChannels = (htmlString: string, serverId: number) => {
  const parser = new DOMParser();
  const result: Channel[] = [];
  const doc = parser.parseFromString(htmlString, 'text/html');
  const collection = doc.getElementById(`ts3v_${serverId}`)?.children;

  if (!collection) return result;

  let lastChannel = null;

  for (const item of collection) {
    if (item.classList.contains('tsv_channel')) {
      lastChannel = createChannel(item);
      result.push(lastChannel);
    }

    if (item.classList.contains('tsv_user')) {
      const user = createUser(item);
      lastChannel!.users.push(user);
    }
  }

  return result;
};
