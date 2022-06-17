import { useEffect } from 'react';
import useSearch from './useSearch';

const useDebounce = (input: string, delay: number = 400) => {

    const { query, setQuery } = useSearch();

    useEffect(() => {
        const timeout = setTimeout(() => setQuery(input), delay);

        return () => clearTimeout(timeout);
    }, [input, delay, setQuery]);

    return query

}

export default useDebounce