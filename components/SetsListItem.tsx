import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./button";

interface SetsListItemProp {
  name: string;
  description: string;
  numberOfCards: number;
  setId: string;
}

export default function SetsListItem({
  name,
  description,
  numberOfCards,
  setId,
}: SetsListItemProp) {
  const [lineCount, setLineCount] = useState(0);
  const [showMore, setShowMore] = useState(false);

  console.log(setId);

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.setName}>{name}</Text>
        <Text
          style={style.description}
          onTextLayout={(e) => setLineCount(e.nativeEvent.lines.length)}
          numberOfLines={lineCount >= 3 && !showMore ? 3 : 0}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <MaterialCommunityIcons name="cards" size={26} color="#1ABC9C" />
          <Text style={style.numberText}>{numberOfCards}</Text>
          <View style={{ marginLeft: "auto", flexDirection: "row" }}>
            {lineCount > 5 ? (
              <CustomButton
                buttonText="Show More"
                styleText={{
                  fontSize: 18,
                  height: 28,
                }}
                styleButton={{
                  marginRight: 5,
                }}
                onPress={handleShowMore}
              />
            ) : null}

            <Link href={`/flashCards?index=${setId}`} asChild>
              <CustomButton
                buttonText="View"
                styleText={{
                  fontSize: 20,
                }}
              />
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A3D9FF",
    backgroundColor: "#EBF5FB",
  },
  setName: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
  },
  description: {
    margin: 5,
    color: "rgba(0, 0, 0, 0.6)",
  },
  numberText: {
    fontWeight: "bold",
    fontSize: 26,
  },
});
