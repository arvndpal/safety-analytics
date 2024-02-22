import { useEffect, useState } from 'react';

const useCustom = (defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setTimeout(() => {
      setValue('Custom Hooks');
    }, 3000);
  }, []);
  return value;
};

export default useCustom;
