import React from 'react';
import './services.scss';
import ServicesDashboard from './ServicesDashboard';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Hizmetler</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <ServicesDashboard />
      </div>
    </div>
  </React.Fragment>
);
