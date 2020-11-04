import React from "react";
import { Chart, Series } from "devextreme-react/chart";

const AllAppChart = ({ data }) => {
  return (
    <div>
      <Chart id="chart" dataSource={data}>
        <Series
          valueField="count"
          argumentField="month"
          name="Aylara Göre Dağılım"
          type="bar"
          color="#ffaa66"
        />
      </Chart>
    </div>
  );
};

export default AllAppChart;
