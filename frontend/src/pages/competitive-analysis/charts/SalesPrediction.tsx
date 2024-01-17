import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViolationTrendData } from '../../../lib/features/chartSlice';

const SalesPredictions = () => {
  const dispatch = useDispatch();
  const violationTrendData = useSelector(
    (state: any) => state.chart.violationTrendData
  );

  const [options, setOptions] = useState({
    chart: {
      height: 300,
    },
    title: {
      text: '',
      align: 'left',
    },

    subtitle: {
      text: 'Sales Predictions',
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
      categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
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
    series: [
      {
        name: 'Hyundai',
        data: [110, 85, 45, 75, 72, 120],
      },
      {
        name: 'BMW',
        data: [80, 115, 76, 51, 50, 90],
      },
      {
        name: 'Audi',
        data: [55, 65, 42, 60, 46, 70],
      },
      {
        name: 'Others',
        data: [45, 55, 52, 90, 46, 60],
      },
    ],
  });
  useEffect(() => {
    // @ts-ignore
    // dispatch(getViolationTrendData());
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default SalesPredictions;
