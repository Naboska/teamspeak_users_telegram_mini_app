import { QueryOptions, useQuery } from '@tanstack/react-query';

import { Channel, parseTsChannels } from '@/helpers/parse-ts-channels';

declare global {
  interface Window {
    TSV: {
      ViewerScript: {
        Data: { [key: number]: { html: string } };
      };
    };
  }
}

export type ServerInfoResponse = Channel[];

window.TSV = { ViewerScript: { Data: {} } };

export const SERVER_INFO_QUERY_KEY = ['server_info'];

const SERVER_ID = 1130297;

const getServerInfo = async (): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.tsviewer.com/ts3viewer.php?ID=${SERVER_ID}&text=757575&text_size=12&text_family=1&text_s_color=000000&text_s_weight=normal&text_s_style=normal&text_s_variant=normal&text_s_decoration=none&text_i_color=&text_i_weight=normal&text_i_style=normal&text_i_variant=normal&text_i_decoration=none&text_c_color=&text_c_weight=normal&text_c_style=normal&text_c_variant=normal&text_c_decoration=none&text_u_color=000000&text_u_weight=normal&text_u_style=normal&text_u_variant=normal&text_u_decoration=none&text_s_color_h=&text_s_weight_h=bold&text_s_style_h=normal&text_s_variant_h=normal&text_s_decoration_h=none&text_i_color_h=000000&text_i_weight_h=bold&text_i_style_h=normal&text_i_variant_h=normal&text_i_decoration_h=none&text_c_color_h=&text_c_weight_h=normal&text_c_style_h=normal&text_c_variant_h=normal&text_c_decoration_h=none&text_u_color_h=&text_u_weight_h=bold&text_u_style_h=normal&text_u_variant_h=normal&text_u_decoration_h=none&iconset=default`;
    document.body.appendChild(script);

    let checkCount = 5;

    const check = () => {
      if (window.TSV.ViewerScript.Data[SERVER_ID]) {
        resolve(window.TSV.ViewerScript.Data[SERVER_ID].html);
      } else {
        if (!checkCount) return reject();
        setTimeout(check, 500);
        checkCount--;
      }
    };

    setTimeout(check, 200);
  });

export const useServerInfo = (config?: Omit<QueryOptions<ServerInfoResponse>, 'queryKey' | 'queryFn'>) => {
  const { data, ...rest } = useQuery<ServerInfoResponse>({
    ...config,
    queryKey: SERVER_INFO_QUERY_KEY,
    queryFn: async () => {
      const html = await getServerInfo();

      return parseTsChannels(html, SERVER_ID);
    },
  });

  return {
    ...rest,
    channels: data ?? [],
  };
};
