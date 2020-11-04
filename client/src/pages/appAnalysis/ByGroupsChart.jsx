import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from "devextreme-react/chart";
import cuid from "cuid";

const ByGroupsChart = ({ data, groups }) => {
  const onPointClick = (e) => {
    e.target.select();
  };
  return (
    <div>
      <Chart
        id="chart"
        title="Aylık Gruplara Göre Dersler"
        dataSource={data}
        onPointClick={onPointClick}
      >
        <CommonSeriesSettings
          argumentField="month"
          type="bar"
          hoverMode="allArgumentPoints"
          selectionMode="allArgumentPoints"
        >
          <Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label>
        </CommonSeriesSettings>
        {groups &&
          groups.length > 0 &&
          groups.map((t) => {
          return   <Series
              key={cuid()}
              argumentField="month"
              valueField={t.id}
              name={t.name}
            />;
          })}
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
        ></Legend>
        <Export enabled={true} />
      </Chart>
    </div>
  );
};

export default ByGroupsChart;
