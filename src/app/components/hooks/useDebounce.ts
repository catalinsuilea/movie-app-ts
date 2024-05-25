import React, { useState, useEffect } from "react";

export const useDebounce = (input: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(input);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [input, delay]);

  return debounceValue;
};
