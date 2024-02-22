import useCustom from '../../hooks/useCustom';
import useFetchComments from '../../hooks/useFetchComments';

const CustomHook = () => {
  const value = useCustom('Initial Value');
  const { comments, isLoading, error } = useFetchComments();
  console.log(`Custom Hook`, { comments, isLoading, error });
  return (
    <div className='p-10'>
      <div className='p-2'> {value}</div>
      <div className='flex flex-col gap-5'>
        {isLoading && <div>Loading...</div>}
        {comments.map((comment) => (
          <div
            className='flex flex-col shadow-lg w-3/5 p-2 bg-gray-100 rounded-md'
            key={comment.title}
          >
            <div className='font-semibold'>{comment.title}</div>
            <div> {comment.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomHook;
