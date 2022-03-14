import { useEffect, useState } from 'react';

export const usePersistedState = (key, value, initialState) => {
  const [state, setState] = useState(() => {
    const cookieValue = value;
    if (cookieValue) {
      return JSON.parse(cookieValue);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return { state, setState };
};
