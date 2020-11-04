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

const ByTrianersChart = ({ data, trainers }) => {
  const onPointClick = (e) => {
    e.target.select();
  };
  return (
    <div>
      <Chart
        id="chart"
        title="Aylık Eğitmenlere Göre Dersler"
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
        {trainers &&
          trainers.length > 0 &&
          trainers.map((t) => {
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

export default ByTrianersChart;
