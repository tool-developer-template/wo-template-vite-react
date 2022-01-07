import React from 'react';
import {history,Link} from '@@/router';
import {useIntl} from '@@/locale';
import {useApp} from '@@/hooks';

import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import './style.module.less';
//
import settings from '@/config/defaultSettings';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';

import {getUserToken} from '@/utils/storage';
//
const loginPath = '/user/login';

const BasicLayout = (props: any) => {
  const { children, location, route, ...restProps } = props;
  const {currentUser,initialState,setInitialState,logout} = useApp({
    currentUser:{
      name:'',
      avatar:''
    }
  })
  //
  const {formatMessage} = useIntl();
  // layout 是否渲染相关
  const layoutRestProps: BasicLayoutProps & {
    RightContent?:
      | false
      | ((
          props: BasicLayoutProps,
          dom: React.ReactNode,
          config: any,
        ) => React.ReactNode);
    name?:string;
    locale?:boolean|undefined;    
  } = {
    // RightContent,
    itemRender: (route) => <Link to={route.path}>{route.breadcrumbName}</Link>,
    formatMessage,
    ...settings,
    ...restProps
  };
  //
  return (
    <ProLayout
      route={route}
      location={location}
      title={layoutRestProps?.name || layoutRestProps?.title}
      navTheme="dark"
      siderWidth={256}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        history.push('/');
      }}
      menu={ { locale: layoutRestProps.locale } }
      //
      menuDataRender={
        initialState.patchMenus
          ? (menuData) => initialState?.patchMenus(menuData, currentUser)
          : undefined
      }
      onPageChange={()=>{
        const { location } = history;
        const token = getUserToken();
        // 如果没有登录，重定向到 login
        if (!token && location.pathname !== loginPath) {
          //
          history.push(loginPath);
        }
      }}
      formatMessage={layoutRestProps?.formatMessage}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          );
        }
        //
        return defaultDom;
      }}
      disableContentMargin
      fixSiderbar
      fixedHeader
      footerRender={()=><Footer/>}
      {...layoutRestProps}
      rightContentRender={
        // === false 应该关闭这个功能
        layoutRestProps?.RightContent !== false &&
        ((layoutProps) => {
          const userConfig =               {
            ...layoutRestProps,
            logout
          };
          const dom = RightContent?.(
            userConfig,
            currentUser
          );
          if (layoutRestProps.RightContent) {
            //
            return layoutRestProps.RightContent(layoutProps, dom, {
              userConfig,
              currentUser,
              setInitialState,
            });
          }
          return dom;
        })
      }
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
