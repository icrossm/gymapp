import React from 'react';
import './appAnalysis.scss';
import AnalysisDashboard from './AnalysisDashboard';

export default () => (
  <React.Fragment>
    <h2 className={'content-block'}>Analizler</h2>
    <div className={'content-block'}>
      <div className={'dx-card responsive-paddings'}>
        <AnalysisDashboard />
      </div>
    </div>
  </React.Fragment>
);
