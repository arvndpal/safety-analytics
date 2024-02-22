import { useEffect, useState } from 'react';
import { posts } from './data';
type Comment = {
  title: string;
  description: string;
};

function wait(ms: number) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
const useFetchComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const handleFetchComments = async () => {
      try {
        // const response = await fetch('/api/comments');
        // const comments = await response.json();
        await wait(3000);
        setComments(posts);
      } catch (error) {
        setError('error fetching comments');
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchComments();
  }, []);

  return { comments, isLoading, error };
};

export default useFetchComments;
