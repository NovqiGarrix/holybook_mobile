import { FunctionComponent, useContext, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useQuery } from "react-query";
import COLORS from "../constants/COLORS";
import { MainContext } from "../contexts/MainContext";
import getBooks from "../fetchers/getBooks";
import useSearch from "../hooks/useSearch";

import Book from "./Book";

const Books: FunctionComponent = () => {
  const { data, isLoading, isError, error } = useQuery("books", () =>
    getBooks()
  );
  const { activeBook, setActiveBook } = useContext(MainContext);
  const { query } = useSearch();

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (data?.books.length) {
      setActiveBook(data.books[0]);
    }
  }, [data?.books.length]);

  /**
   * Handle search
   */
  useEffect(() => {
    if (!query) return;
    if (!activeBook) return;
    if (!data?.books) return;

    let bookQuery = query;

    if (bookQuery.includes(":")) {
      bookQuery.split(":")[0];
      bookQuery =
        bookQuery.split(" ").length >= 2
          ? `${bookQuery.split(" ")[0]} ${bookQuery.split(" ")[1]}`
          : bookQuery.split(" ")[0];
    } else {
      bookQuery =
        bookQuery.split(" ").length > 2
          ? `${bookQuery.split(" ")[0]} ${bookQuery.split(" ")[1]}`
          : bookQuery.split(" ")[0];
    }

    if (activeBook.kitab.toLowerCase().includes(bookQuery.toLowerCase()))
      return;

    const matchedBook = data.books.find((book) =>
      book.kitab.toLowerCase().includes(bookQuery.toLowerCase())
    );
    const matchedBookIndex = data.books.findIndex((book) =>
      book.kitab.toLowerCase().includes(bookQuery.toLowerCase())
    );

    if (matchedBook) {
      if (flatListRef.current) {
        // const myRef = createRef<View>();
        flatListRef.current.scrollToIndex({
          index: matchedBookIndex,
          animated: true,
        });
      }

      setActiveBook(matchedBook);
    }
  }, [query]);

  const RenderBook = (info: ListRenderItemInfo<any>) => (
    <TouchableWithoutFeedback onPress={() => setActiveBook(info.item)}>
      <View style={{ paddingVertical: 15, paddingLeft: 10 }}>
        <Book
          index={info.index}
          book={info.item}
          isActive={info.item.kitab === activeBook?.kitab}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ marginTop: 20, zIndex: 10 }}>
      {isLoading ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={COLORS.darkBlue}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              fontFamily: "Dosis_400Regular",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            Getting all books...
          </Text>
        </View>
      ) : isError ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Dosis_600SemiBold",
              fontSize: 18,
            }}
          >
            An error occured: {error as string}
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          initialNumToRender={data?.books.length}
          data={data?.books}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            flexGrow: 0,
            overflow: "visible",
            padding: 5,
          }}
          renderItem={RenderBook}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Books;
