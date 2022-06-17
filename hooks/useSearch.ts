import create from "zustand";


interface IUseSearch {
    query: string;
    setQuery: (newQuery: string) => void;
}
const useSearch = create<IUseSearch>((set) => ({
    setQuery(newQuery) {
        set({ query: newQuery });
    },

    query: ""
}))

export default useSearch