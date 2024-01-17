const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-40'>
      <b>
        {' '}
        Did not match correct path. Please click on below button to navigate to
        Dashboard{' '}
      </b>
      <br />
      <a
        className='text-white py-2 px-4 hover:bg-blue-700 rounded-sm bg-blue-500'
        href='/dashboard'
      >
        Dashboard
      </a>
    </div>
  );
};

export default NotFound;
