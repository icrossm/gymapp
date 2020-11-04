import React from 'react';
import './trainers.scss';
import TrainerDashboard from './TrainerDashboard';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Eğitmenler</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <TrainerDashboard />
      </div>
    </div>
  </React.Fragment>
);
