import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViolationTrendData } from '../../../lib/features/chartSlice';

const ViolationTrend = () => {
  const dispatch = useDispatch();
  const violationTrendData = useSelector(
    (state: any) => state.chart.violationTrendData
  );

  const [options, setOptions] = useState({
    title: {
      text: '',
      align: 'left',
    },

    subtitle: {
      text: 'Violation trend over years',
      align: 'left',
    },

    yAxis: {
      title: {
        text: ' ',
      },
      tickInterval: 25,
    },

    legend: {
      align: 'right',
      verticalAlign: 'top',
      symbolRadius: 0,
    },
    xAxis: {
      categories: [],
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
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
    series: [],
  });
  useEffect(() => {
    // @ts-ignore
    dispatch(getViolationTrendData());
  }, []);

  useEffect(() => {
    if (
      violationTrendData?.info?.categories &&
      violationTrendData?.info?.series
    ) {
      const categories = violationTrendData.info.categories;
      const series = violationTrendData.info.series;
      const opt = {
        ...options,
        xAxis: {
          ...options.xAxis,
          categories: categories,
        },
        series: JSON.parse(JSON.stringify(series)),
      };

      setOptions(opt);
    }
  }, [violationTrendData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default ViolationTrend;
