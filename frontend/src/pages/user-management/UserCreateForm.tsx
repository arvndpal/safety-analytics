import { useState } from 'react';
import { createUser } from '../../lib/features/userSlice';
import { useDispatch } from 'react-redux';

const UserCreateForm = (props: any) => {
  const dispatch = useDispatch();
  const { handleAddNew } = props;
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleSave = () => {
    console.log('user saved', user);
    // @ts-ignore
    dispatch(createUser(user));
    handleAddNew(false);
  };
  return (
    <div className="flex max-sm:flex-col gap-2 mb-2">
      <input
        name="email"
        className="py-1  text-[14px]  border rounded p-2 outline-none shadow-none"
        placeholder="Email Address"
        value={user.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        className="py-1  text-[14px]   border rounded p-2 outline-none shadow-none"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <input
        name="firstName"
        type="text"
        className="py-1  text-[14px]  border rounded p-2 outline-none shadow-none"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        type="text"
        className="py-1  text-[14px]  border rounded p-2 outline-none shadow-none"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
      />
      <input
        name="companyName"
        type="text"
        className="py-1  text-[14px]  border rounded p-2 outline-none shadow-none"
        placeholder="Company Name"
        value={user.companyName}
        onChange={handleChange}
      />
      <button
        className=" py-0.5 px-4  text-[14px]  text-white rounded-sm text-center bg-green-500 hover:bg-green-600 cursor-pointer"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        onClick={() => handleAddNew(false)}
        className=" py-0.5 px-4  text-[14px] text-white  rounded-sm text-center bg-gray-300 hover:bg-gray-500 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
};

export default UserCreateForm;
