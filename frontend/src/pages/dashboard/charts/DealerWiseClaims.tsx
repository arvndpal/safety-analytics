import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import { getDealerWiseClaimsData } from '../../../lib/features/chartSlice';
import { useEffect, useState } from 'react';
import SimpleBackdrop from '../../../components/shared/Backdrop';
if (Highcharts) exporting(Highcharts);

const DealerWiseClaims = () => {
  const dispatch = useDispatch();
  const { dealerWiseClaims, dealerWiseClaimsLoading } = useSelector(
    (state: any) => state.chart
  );

  console.log('isLoading', dealerWiseClaimsLoading);
  const [options, setOptions] = useState({
    chart: {
      type: 'column',
    },
    title: {
      text: ' ',
      align: 'left',
    },
    subtitle: {
      text: 'Dealer-wise Claims',
      align: 'left',
    },
    xAxis: {},
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
    yAxis: {
      min: 0,
      title: {
        text: ' ',
      },
      lineWidth: 1,
      tickInterval: 25,
      gridLineColor: 'transparent',
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      valueSuffix: ' ',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [],
  });
  useEffect(() => {
    // @ts-ignore
    dispatch(getDealerWiseClaimsData());
  }, []);

  useEffect(() => {
    if (dealerWiseClaims?.info?.length) {
      const data = dealerWiseClaims.info.map(
        (item: { year: number; claims: number }) => item.claims
      );
      const categories = dealerWiseClaims.info.map(
        (item: { year: number; claims: number }) => item.year
      );
      const opt = {
        ...options,
        xAxis: {
          categories: categories,
        },
        series: [
          {
            name: 'Claims',
            data: data,
          },
        ],
      };
      //@ts-ignore
      setOptions(opt);
    }
  }, [dealerWiseClaims]);

  if (dealerWiseClaimsLoading) {
    return <SimpleBackdrop open={dealerWiseClaimsLoading} />;
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default DealerWiseClaims;
