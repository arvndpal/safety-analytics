import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getViolationCategoriesCount } from '../../../lib/features/chartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ViolationCategoriesCount = () => {
  const dispatch = useDispatch();
  const violationCategoriesCount = useSelector(
    (state: any) => state.chart.violationCategoriesCount
  );

  const [options, setOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'middle',
      y: -25,
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
      text: 'Violation Categories - Count',
      align: 'left',
    },
    legend: {
      enabled: true,

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
        size: '50%',
      },
    },
    series: [
      {
        type: 'pie',
        name: '',
        innerSize: '60%',
        data: [],
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
    dispatch(getViolationCategoriesCount());
  }, []);

  useEffect(() => {
    if (violationCategoriesCount?.info) {
      const data = violationCategoriesCount.info;
      const sum = data.reduce((acc: any, item: any) => {
        return acc + item.y;
      }, 0);
      let series = options.series;
      series[0].data = JSON.parse(JSON.stringify(data));
      const opt = {
        ...options,
        title: { ...options.title, text: sum },
        series: series,
      };
      setOptions(opt);
    }
  }, [violationCategoriesCount]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default ViolationCategoriesCount;
