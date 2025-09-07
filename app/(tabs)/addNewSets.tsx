import CustomButton from "@/components/button";
import NewCard from "@/components/NewCard";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface card {
  id: string;
  question: string;
  answer: string;
}

export default function AddNewSet() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cards, setCards] = useState<card[]>([]);

  console.log(cards);

  return (
    <SafeAreaView>
      <View>
        <Text>Title</Text>
        <TextInput
          placeholder="this is name"
          onChangeText={(title) => setTitle(title)}
          value={title}
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
