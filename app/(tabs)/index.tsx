import SetsListItem from "@/components/SetsListItem";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface itemProp {
  id: string;
  name: string;
  description: string;
  cards: Card[];
}

const fileUri = FileSystem.documentDirectory + "sets.json";

export default function SetsList() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<itemProp[] | null>(null);
  const [filteredData, setFilteredData] = useState<
    itemProp[] | null | undefined
  >(data);

  useEffect(() => {
    const initialize = async () => {
      const loadedData = await fetchData();
      setData(loadedData.flashcardSets);
    };

    initialize();
  }, []);

  function updateSearch(search: string): void {
    setSearch(search);

    const newData = data?.filter((item: itemProp) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(newData);
  }

  return (
    <SafeAreaView style={style.container}>
      <SearchBar
        platform="default"
        placeholder="Search topics..."
        value={search}
        onChangeText={updateSearch}
        round
        containerStyle={style.searchContainer}
        inputContainerStyle={style.inputContainer}
        inputStyle={style.input}
        onClear={() => setSearch("")}
      />
      <FlatList
        data={filteredData || data}
        renderItem={({ item }) => (
          <SetsListItem
            name={item.name}
            description={item.description}
            numberOfCards={item.cards.length}
            setId={Number(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

async function fetchData() {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      const defaultData = require("@/assets/data/sets.json");
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(defaultData));
    }

    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(error);
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6EAF8",
  },
  searchContainer: {
    backgroundColor: "#D6EAF8",
    borderColor: "#D6EAF8",
  },
  inputContainer: {
    backgroundColor: "#EBF5FB",
  },
  input: {
    color: "#000",
  },
});
