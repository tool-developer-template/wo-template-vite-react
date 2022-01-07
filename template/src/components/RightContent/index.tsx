// @ts-nocheck
import React from 'react';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import {history} from '@@/router';
import { stringify } from 'querystring';
import { LogoutOutlined } from '@ant-design/icons';

export default function renderRightContent(
  runtimeLayout: any,
  currentUser: any,
) {
  if (runtimeLayout.rightRender) {
    return runtimeLayout.rightRender(
      currentUser,
      runtimeLayout,
    );
  }
  //
  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item
        key="logout"
        onClick={() => {
          //
          runtimeLayout.logout && runtimeLayout?.logout(currentUser)
          //
          const { query = {}, pathname } = history.location;
          const { redirect } = query;
          // Note: There may be security issues, please note
          if (window.location.pathname !== '/user/login' && !redirect) {
            history.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            });
          }
        }}
      >
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={
          currentUser?.avatar ||
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        }
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">{currentUser?.name}</span>
    </span>
  );

  /*if (loading) {
    return (
      <div className="umi-plugin-layout-right">
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    );
  }*/

  return (
    <div className="umi-plugin-layout-right anticon">
      {runtimeLayout.logout ? (
        <Dropdown overlay={menu} overlayClassName="umi-plugin-layout-container">
          {avatar}
        </Dropdown>
      ) : (
        avatar
      )}
    </div>
  );
}
