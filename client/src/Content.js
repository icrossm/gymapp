import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavInnerToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';

export default function() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route
            exact
            key={path}
            path={path}
            component={component}
          />
        ))}
        <Redirect to={'/home'} />
      </Switch>
      <Footer>
        Arpeta Yazılım © 2020-{new Date().getFullYear()} {appInfo.title} 
        <br />Tüm Hakları Saklıdır.
      </Footer>
    </SideNavBarLayout>
  );
}
