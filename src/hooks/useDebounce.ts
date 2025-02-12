import { useCallback, useEffect, useMemo, useState } from "react";


function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const updateDebounceValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const time = setTimeout(updateDebounceValue, delay);

    return () => {
      clearTimeout(time);
    };
  }, [value, updateDebounceValue]);

  return useMemo(() => debouncedValue, [debouncedValue]);
}

export default useDebounce;
