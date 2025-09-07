import CustomButton from "@/components/button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import sets from "../assets/data/sets.json";

export default function FlashCards() {
  const { index } = useLocalSearchParams();
  const cards = sets.flashcardSets[Number(index)].cards;
  const [currentCard, setCurrentCard] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: sets.flashcardSets[Number(index)].name,
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

  return (
    <SafeAreaView style={style.container}>
      <Pressable onPress={handleCardPress} style={style.cards}>
        {showingAnswer ? (
          <View>
            <Text style={style.text}>ANSWER</Text>
            <Text style={style.text}>{cards[currentCard].answer}</Text>
          </View>
        ) : (
          <View>
            <Text style={style.text}>QUESTION</Text>
            <Text style={style.text}>{cards[currentCard].question}</Text>
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
          disableCondition={currentCard === cards.length - 1}
          buttonText=">"
          styleText={{ fontSize: 50 }}
        />
      </View>
    </SafeAreaView>
  );
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
