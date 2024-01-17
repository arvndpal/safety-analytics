import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import { getModelWiseClaimsData } from '../../../lib/features/chartSlice';

const ProductQualityRatingScore = () => {
  const dispatch = useDispatch();
  const modelWiseClaims = useSelector(
    (state: any) => state.chart.modelWiseClaims
  );

  const [options, setOptions] = useState({
    chart: {
      type: 'column',
      ignoreHiddenSeries: true,
      height: 250,
    },
    title: {
      text: ' ',
      align: 'left',
    },
    subtitle: {
      text: 'Product Quality Rating & Score',
      align: 'left',
    },
    plotOptions: {
      column: {
        grouping: false,
        pointPlacement: null,
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          symbol: 'url(/dots.png)',
          symbolY: 22,
          symbolX: 22,
          x: -10,
        },
      },
    },
    xAxis: {
      categories: ['Hyundai', 'BMW', 'Audi', 'Others'],
      startOnTick: true,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: ' ',
      },
    },
    legend: {
      symbolRadius: 0,
    },
    series: [
      {
        name: 'Accelerating',
        data: [
          {
            name: 'Accelerating',
            y: 2,
            x: 0,
          },
        ],
        pointWidth: 15,
      },
      {
        name: 'Slipping',
        data: [
          {
            name: 'Slipping',
            y: 4,
            x: 1,
          },
        ],
        pointWidth: 15,
      },
      {
        name: 'Noise',
        data: [
          {
            name: 'Noise',
            y: 6,
            x: 2,
          },
        ],
        pointWidth: 15,
      },
      {
        name: 'Others',
        data: [
          {
            name: 'Others',
            y: 9,
            x: 3,
          },
        ],
        pointWidth: 15,
      },
    ],
  });
  useEffect(() => {
    // @ts-ignore
    // dispatch(getModelWiseClaimsData());
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default ProductQualityRatingScore;
