import { StatusBar } from "expo-status-bar";
import { createRef } from "react";
import { ScrollView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  useFonts,
  Trirong_400Regular,
  Trirong_300Light,
  Trirong_500Medium,
  Trirong_700Bold,
} from "@expo-google-fonts/trirong";
import {
  Dosis_400Regular,
  Dosis_500Medium,
  Dosis_600SemiBold,
  Dosis_700Bold,
} from "@expo-google-fonts/dosis";

import COLORS from "./constants/COLORS";
import {
  Books,
  Chapters,
  Header,
  ScrollToTopButton,
  SearchComponent,
  Verses,
} from "./components";
import MainContextProvider from "./contexts/MainContext";

export default function AppWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });
  return (
    <QueryClientProvider client={client}>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </QueryClientProvider>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    Trirong_300Light,
    Trirong_400Regular,
    Trirong_500Medium,
    Trirong_700Bold,
    Dosis_400Regular,
    Dosis_500Medium,
    Dosis_600SemiBold,
    Dosis_700Bold,
  });

  const scrollViewRef = createRef<ScrollView>();

  const scrollToTop = () => {
    if (!scrollViewRef.current) return;
    scrollViewRef.current.scrollTo({ animated: true, y: 0 });
  };

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="inverted" />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 30,
          paddingVertical: 70,
          backgroundColor: COLORS.blue,
        }}
        ref={scrollViewRef}
      >
        <Header />
        <SearchComponent />
        <Books />
        <Chapters />
        <Verses scrollViewRef={scrollViewRef} />
      </ScrollView>
      <ScrollToTopButton handler={scrollToTop} />
    </>
  );
}
