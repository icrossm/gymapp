import React from 'react';
import './appByGroup.scss';
import AppGroupDashboard from './AppGroupDashboard';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Üye Gruplarına Göre Randevular</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <AppGroupDashboard/>
      </div>
    </div>
  </React.Fragment>
);
