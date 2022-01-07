import moment from 'moment';
import { parse } from 'querystring';
import replaceObjectKeys from '@pansy/replace-object-keys';
import { MenuDataItem } from '@ant-design/pro-layout';

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = import.meta.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// -- JoJo Reading  --------------------------------------------------------------------------

export interface DefaultPagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface DefaultListModal {
  list: any[];
  pagination: DefaultPagination;
}
export const defaultPagination: DefaultPagination = { current: 1, pageSize: 20 };

/** 列表数据模型 */
export const defaultListModal: DefaultListModal = { list: [], pagination: defaultPagination };

/** 查询字段转换 */
export const convertQueryParams = (data: any, config = {}) => {
  const options = { current: 'pageNum', ...config };
  return replaceObjectKeys(data, options, {
    simplify: false,
    filter: (obj) => {
      Object.entries(obj).forEach(([key, val]) => {
        if (val === '' || val === undefined) {
          Reflect.deleteProperty(obj, key);
        }
      });
      return obj;
    },
  });
};

/** 接口返回列表数据转换 */
export const convertListModal = (data: any): DefaultListModal => {
  const { pageNum, pageSize, records, total } = data;
  return { list: records, pagination: { current: pageNum, pageSize, total } };
};

/** SearchParams 查询段转为object */
export function searchParams(search: string) {
  const obj = {};
  const params = search.split('?')[1].split('&');
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i].split('=');
    obj[param[0]] = decodeURIComponent(param[1]);
  }
  return obj;
}

/** 根据名称获取查询字段值 */
export function searchParamName(attr: string, search?: string) {
  const match = new RegExp(`[?&]${attr}=([^&]*)`).exec(search || window.location.href);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const format = (v: number | string) => moment(v).format('YYYY-MM-DD');
// 导出公共库方法
export { replaceObjectKeys, format };
