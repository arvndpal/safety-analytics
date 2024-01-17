import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getViolationCategoriesCount } from '../../../lib/features/chartSlice';
import { useDispatch, useSelector } from 'react-redux';

const RecallsReported = () => {
  const dispatch = useDispatch();
  const violationCategoriesCount = useSelector(
    (state: any) => state.chart.violationCategoriesCount
  );

  const [options, setOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 250,
    },
    title: {
      text: '350',
      align: 'center',
      verticalAlign: 'middle',
      y: -10,
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
    subtitle: {
      text: 'Recalls Reported',
      align: 'left',
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
      symbolRadius: 0,
    },

    tooltip: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 10,
        },
        center: ['50%', '50%'],
        size: '90%',
      },
    },
    series: [
      {
        type: 'pie',
        name: '',
        innerSize: '60%',
        data: [
          {
            name: 'Hyundai',
            y: 100,
          },
          {
            name: 'BMW',
            y: 125,
          },
          {
            name: 'Audi',
            y: 75,
          },
          {
            name: 'Others',
            y: 50,
          },
        ],
        dataLabels: {
          enabled: true,
          format: '{y}',
        },
        showInLegend: true,
      },
    ],
  });
  useEffect(() => {
    // @ts-ignore
    // dispatch(getViolationCategoriesCount());
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default RecallsReported;
