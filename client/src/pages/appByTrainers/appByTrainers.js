import React from 'react';
import './appByTrainers.scss';
import AppointmentDashboard from './AppointmentDashboard';

export default () => (
  <React.Fragment>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <AppointmentDashboard />
      </div>
    </div>
  </React.Fragment>
);
