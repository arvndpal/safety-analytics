const MetricCard = () => {
  const red = '#ff0000';
  const green = 'green';
  return (
    <metric-card
      heading='Change Request'
      value1='70'
      text1='Total Cr'
      value1Color={red}
      value3Color={green}
      value2='23.4'
      text2='Total Approved'
      value3='12'
      text3='Open Cr'
    ></metric-card>
  );
};

export default MetricCard;
