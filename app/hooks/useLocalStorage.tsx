/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

function useLocalStorage(key: string): [any, (nextState: any) => void] {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setState(JSON.parse(storedValue));
    }
  }, [key]);

  const setWithLocalStorage = (nextState: any) => {    
    setState(nextState);
    localStorage.setItem(key, JSON.stringify(nextState));
  };

  return [state, setWithLocalStorage];
}

export default useLocalStorage;
