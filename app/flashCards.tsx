import CustomButton from "@/components/button";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface card {
  id: string;
  question: string;
  answer: string;
}

interface set {
  id: string;
  name: string;
  description: string;
  cards: card[];
}

const fileUri = FileSystem.documentDirectory + "sets.json";

export default function FlashCards() {
  const { index } = useLocalSearchParams();
  const [set, setSet] = useState<set | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getSet = async () => {
      setSet(await fetchData(index));
    };

    getSet();
  }, [index]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: set?.name,
    });
  });

  function handleCardPress() {
    setShowingAnswer(!showingAnswer);
  }

  function handleNextCard() {
    setCurrentCard(currentCard + 1);
    setShowingAnswer(false);
  }

  function handlePreviousCard() {
    setCurrentCard(currentCard - 1);
    setShowingAnswer(false);
  }

  console.log(set);

  return (
    <SafeAreaView style={style.container}>
      <Pressable onPress={handleCardPress} style={style.cards}>
        {showingAnswer ? (
          <View>
            <Text style={style.text}>ANSWER</Text>
            <Text style={style.text}>{set?.cards[currentCard].answer}</Text>
          </View>
        ) : (
          <View>
            <Text style={style.text}>QUESTION</Text>
            <Text style={style.text}>{set?.cards[currentCard].question}</Text>
          </View>
        )}
      </Pressable>
      <View style={style.buttonsContainer}>
        <CustomButton
          onPress={handlePreviousCard}
          disableCondition={currentCard === 0}
          buttonText="<"
          styleText={{ fontSize: 50 }}
        />
        <CustomButton
          onPress={handleNextCard}
          disableCondition={currentCard === (set?.cards.length || 1) - 1}
          buttonText=">"
          styleText={{ fontSize: 50 }}
        />
      </View>
    </SafeAreaView>
  );
}

async function fetchData(index: string | string[]) {
  const content = await FileSystem.readAsStringAsync(fileUri);
  const allData = JSON.parse(content);
  return allData.flashcardSets.filter((item: set) => item.id === index)[0];
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#D6EAF8",
  },
  cards: {
    width: "80%",
    height: "70%",
    marginTop: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBF5FB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A3D9FF",
  },
  text: {
    color: "#2C3E50",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
