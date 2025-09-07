import { Dispatch, SetStateAction, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface card {
  id: string;
  question: string;
  answer: string;
}

interface NewCardProp {
  id: string;
  question: string;
  answer: string;
  setCards: Dispatch<SetStateAction<card[]>>;
}

export default function NewCard({
  id,
  question,
  answer,
  setCards,
}: NewCardProp) {
  const [editQuestion, setEditQuestion] = useState<string>(question);
  const [editAnswer, setEditAnswer] = useState<string>(answer);

  return (
    <View>
      <View>
        <Text>{id}</Text>
      </View>
      <View>
        <Text>Question</Text>
        <TextInput
          placeholder="question here"
          onChangeText={(question) => setEditQuestion(question)}
          value={editQuestion}
          onBlur={() =>
            setCards((data) =>
              data.map((item) =>
                item.id === id ? { ...item, question: editQuestion } : item
              )
            )
          }
        />
        <Text>Answer</Text>
        <TextInput
          placeholder="answer here"
          onChangeText={(answer) => setEditAnswer(answer)}
          value={editAnswer}
          onBlur={() =>
            setCards((data) =>
              data.map((item) =>
                item.id === id ? { ...item, answer: editAnswer } : item
              )
            )
          }
        />
      </View>
    </View>
  );
}
