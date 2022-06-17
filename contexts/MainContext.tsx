import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  Context,
  FunctionComponent,
  useEffect,
  MutableRefObject,
  createRef,
  RefObject,
} from "react";
import { ScrollView, View } from "react-native";
import { useQuery } from "react-query";
import getVerses from "../fetchers/getVerses";
import { IBook, IPasal } from "../types";

interface IMainContext {
  activeBook: IBook | null;
  setActiveBook: Dispatch<SetStateAction<IBook | null>>;

  activeChapter: IPasal | null;
  setActiveChapter: Dispatch<SetStateAction<IPasal | null>>;

  versesRefs: Array<MutableRefObject<View>>;
}

export const MainContext = createContext<IMainContext | null>(
  null
) as Context<IMainContext>;

const MainContextProvider: FunctionComponent = (props) => {
  const { children } = props;

  const [activeBook, setActiveBook] = useState<IBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<IPasal | null>(null);
  const [versesRefs, setVersesRefs] = useState<Array<MutableRefObject<View>>>(
    []
  );

  const { data: versesData } = useQuery(
    ["verses", activeChapter],
    () => getVerses(activeBook?.kitab!, activeChapter?.pasal!),
    { enabled: false }
  );

  useEffect(() => {
    if (!versesData?.ayat.length) return;

    const myrefs = Array(versesData.ayat.length)
      .fill("")
      .map((_, index) => versesRefs[index] ?? createRef());
    setVersesRefs(myrefs);
  }, [versesData?.ayat.length]);

  const value: React.ProviderProps<IMainContext>["value"] = {
    activeBook,
    setActiveBook,
    activeChapter,
    setActiveChapter,
    versesRefs,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
