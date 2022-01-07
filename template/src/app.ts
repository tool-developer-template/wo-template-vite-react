// 引入antd样式
import '~antd/dist/antd.less';
import xhr from '@tool-developer/wo-request';
import {removeUserToken} from '@/utils/storage';
// TODO TEST
// const hasRoutes = ['/home'];
// 
export const request = (options:any)=>{
  //
  return xhr.request(options);
}
// 退出
export const logout = ()=>{
  //
  removeUserToken();
}
// 权限规则处理
export const access = (currentUser:any)=>{
  //
  const isAdmin = true;
  
  //
  return {
    adminRouteFilter: () => isAdmin, // 只有管理员可访问
    // normalRouteFilter: (route:any) => hasRoutes.includes(route.path), // initialState 中包含了的路由才有权限访问
    normalRuleFilter:(key:string)=>{

      return ['KEY1','KEY2'].includes(key);
    }
  }
}
// 获取用户信息
export async function fetchUserInfo():Promise<{}>{
  //
  return Promise.resolve({
    name:"Luox"
  })
  /*return request({
    name:"Luox"
  })*/
}
// 页面初始数据
export async function getInitialState(): Promise<{
  patchMenus?:(menuData:any,currentUser:any)=>any;
  locale:{
    [key:string]:any;
  };
}> {
  //
  return {
    patchMenus:(menuData:any,currentUser:any)=>{
      //
      return menuData;
      // 无权限菜单不显示处理
      //return menuData.filter((menu:any) => hasRoutes.includes(menu.path));
    },
    locale: {
      src:"../locales/",
      // default zh-CN
      default: 'zh-CN',
      antd: true,
      // default true, when it is true, will use `navigator.language` overwrite default
      baseNavigator: true,
    },
  }
}