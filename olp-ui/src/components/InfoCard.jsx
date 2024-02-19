const InfoCard = ({ name, value, icon, color }) => {
  return (
    <div className='shadow-lg h-40 p-4 rounded-sm bg-white'>
      <div className='flex justify-between'>
        <div className={`${color} px-6 py-7`}>
          <i
            className={`${icon}  text-[16px]  text-white`}
            aria-hidden='true'
          ></i>
        </div>
        <div className='flex flex-col items-end justify-center flaot-right '>
          <div className='text-[14px] max-sm:text-[11px]'>{name}</div>
          <div className='text-[18px]'>{value}</div>
        </div>
      </div>
      <div className='mt-8 text-[14px] text-gray-600 '>Get More Details...</div>
    </div>
  );
};

export default InfoCard;
