import { userDetails, userTableHead } from '../../constants/index';
import '../../utils/we-components.js/usercard.js';
import '../../utils/we-components.js/basicalTable.js';
import '../../utils/we-components.js/metricCard.js';
import BasicTable from './basicTable';
import MetricCard from './MetriCard';
import { useLayoutEffect, useRef } from 'react';

const UserCard = () => {
  const ref = useRef();
  const onChange = (data) => {
    console.log(data);
  };

  const handleChange = (customEvent) => onChange(customEvent);

  useLayoutEffect(() => {
    const { current } = ref;

    current.addEventListener('onChange', handleChange);

    return () => current.removeEventListener('onChange', handleChange);
  }, [ref]);
  return (
    <div className='p-5'>
      {/* <div className='grid gap-8 grid-flow-row-dense  grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        <MetricCard />
      </div> */}
      <BasicTable users={userDetails} heads={userTableHead} />
      <h3 className='text-2xl font-bold mb-5'>Users</h3>
      <div className='flex flex-wrap gap-10'>
        {userDetails.map((user, i) => {
          return (
            <user-card
              ref={ref}
              key={user.name}
              name={user.name}
              customFunction={handleChange}
              avatar={`https://randomuser.me/api/portraits/${
                i % 2 === 1 ? 'women' : 'men'
              }/${i}.jpg`}
            >
              <div slot='email'>
                <b>Email: </b> {user.email}
              </div>
              <div slot='phone'>
                <b>Phone: </b> {user.phone}
              </div>
              <div slot='address' onClick={handleChange}>
                <b>Address: </b> {user.address}
              </div>
            </user-card>
          );
        })}
      </div>
    </div>
  );
};

export default UserCard;
