import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

import {copyright} from '@/config/base';

export default () => {
  //
  return <DefaultFooter copyright={copyright} links={false} />
};
