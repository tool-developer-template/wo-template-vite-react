import { Settings as ProSettings } from '@ant-design/pro-layout';

import {companyName} from './base';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true, //
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: companyName,
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;