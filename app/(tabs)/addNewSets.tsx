import CustomButton from "@/components/button";
import NewCard from "@/components/NewCard";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";

interface card {
  id: string;
  question: string;
  answer: string;
}

const uri = FileSystem.documentDirectory + "sets.json";

export default function AddNewSet() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cards, setCards] = useState<card[]>([]);

  async function updateData() {
    try {
      const content = await FileSystem.readAsStringAsync(uri);

      const oldData = JSON.parse(content);

      if (!Array.isArray(oldData.flashcardSets)) {
        oldData.flashcardSets = [];
      }

      oldData.flashcardSets.push({
        id: uuidv4(),
        name: name,
        description: description,
        cards: cards,
      });

      await FileSystem.writeAsStringAsync(uri, JSON.stringify(oldData));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
      <CustomButton buttonText="save" onPress={updateData} />
      <View>
        <Text>Title</Text>
        <TextInput
          placeholder="this is name"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <Text>Description</Text>
        <TextInput
          placeholder="this is desc"
          onChangeText={(description) => setDescription(description)}
          value={description}
        />
      </View>
      <FlatList
        data={cards}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <NewCard
            id={item.id}
            question={item.question}
            answer={item.answer}
            setCards={setCards}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <CustomButton
        buttonText="add"
        onPress={() =>
          setCards([
            ...cards,
            {
              id: String(cards.length + 1),
              question: "",
              answer: "",
            },
          ])
        }
      />
    </SafeAreaView>
  );
}
