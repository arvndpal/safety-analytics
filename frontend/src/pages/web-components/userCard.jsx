import { userDetails, userTableHead } from '../../constants/index';
import '../../utils/usercard.js';
import '../../utils/basicalTable.js';
import BasicTable from './basicTable';
import MetricCard from './MetriCard';

const UserCard = () => {
  return (
    <div className='p-5'>
      <MetricCard />
      <BasicTable users={userDetails} heads={userTableHead} />
      <h3 className='text-2xl font-bold mb-5'>Users</h3>
      <div className='grid gap-8 grid-flow-row-dense  grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        {userDetails.map((user, i) => {
          return (
            <user-card
              key={user.name}
              name={user.name}
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
              <div slot='address'>
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
