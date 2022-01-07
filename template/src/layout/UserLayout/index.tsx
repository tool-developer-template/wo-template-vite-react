import React from 'react';
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {useIntl} from '@@/locale';
//
import settings from '@/config/defaultSettings';
import Footer from '@/components/Footer';
import styles from './style.module.less';
//
export interface UserLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
//
const UserLayout: React.FC<UserLayoutProps> = (props:any) => {
  const { route = { routes: [] }, children, location = { pathname: '' } } = props;
  const { routes = [] } = route;

  //
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
    ...settings,
  });
  //
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {/*<div className={styles.lang}>
          <SelectLang />
        </div>*/}
        <div className={styles.content}>
          {children}
        </div>
        <Footer/>
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
