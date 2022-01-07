// @ts-ignore
import storage from '@tool-developer/wo-storage';
// @ts-ignore
import session from '@tool-developer/wo-storage/session';

import { envName } from '@/config/base';
// 区分环境和应用
export const AUTHORITY_KEY = `${envName}_AUTHORITY_KEY`.toUpperCase();
export const USER_TOKEN = `${envName}_USER_TOKEN`.toUpperCase();

// 存储使用session方式
const storageCache = storage;
// 存储过期时间
const storageExpireTime = -1; // 永久存储

// 设置user token
export function setUserToken(token: string) {
  if (!token) {
    // eslint-disable-next-line no-console
    console.warn('no token value');
    return;
  }
  //
  storageCache.set(USER_TOKEN, token, storageExpireTime);
}

// 获取user token
export function getUserToken() {
  //
  const token = storageCache.get(USER_TOKEN);
  //
  return token;
}

/** 删除用户TOKEN */
export function removeUserToken() {
  // 通知子应用用户信息删除
  // window.pushSlaveMessage('keep.user.storage.remove');

  storageCache.remove(USER_TOKEN);
}

//
export { storage, session };
// 改写，添加用户token
// eslint-disable-next-line no-shadow
const defaults = (storage: any) => {
  const methods = {};
  ['get', 'set', 'remove'].forEach((method) => {
    // eslint-disable-next-line func-names
    methods[method] = function (...args: any) {
      //
      const key = args[0];
      const token = getUserToken() || '';
      // eslint-disable-next-line no-param-reassign
      args[0] = [token, key].join('|');
      //
      return storage[method].apply(null, args);
    };
  });

  //
  return {
    ...methods,
    clear: storage.clear,
  };
};
//
export default defaults(storage);
