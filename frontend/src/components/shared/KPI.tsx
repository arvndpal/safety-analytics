import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type KPITYPE = {
  label: String;
  kpi: Number | String;
  yoy: Number | String;
  qoq: Number | String;
  isYoyUp: Boolean;
  isQoqUp: Boolean;
};
const KPI = ({ label, kpi, yoy, qoq, isYoyUp, isQoqUp }: KPITYPE) => (
  <div className='flex-col pl-2  '>
    <div className='text-gray-400   text-[11px] pb-1'>{label}</div>
    <div className='flex-between'>
      <div className='font-bold text-[14px]'>
        <>{kpi}</>
      </div>
      <div className='flex-between '>
        <div className='text-gray-400 text-[10px] flex-col -mt-1'>
          <div>
            <>
              {' '}
              {yoy}%
              {isYoyUp ? (
                <ArrowDropDownIcon className='text-red-500' />
              ) : (
                <ArrowDropUpIcon className='text-green-500' />
              )}
            </>
          </div>
          <div className='-mt-1.5'>(YoY)</div>
        </div>
        <div className='text-gray-400 text-[10px] flex-col -mt-1'>
          <div>
            <>
              {' '}
              {qoq}
              {isQoqUp ? (
                <ArrowDropDownIcon className='text-red-500' />
              ) : (
                <ArrowDropUpIcon className='text-green-500' />
              )}
            </>
          </div>
          <div className='-mt-1.5'>(QoQ)</div>
        </div>
      </div>
    </div>
  </div>
);

export default KPI;
