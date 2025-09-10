import { Dispatch, SetStateAction, useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

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
    <KeyboardAvoidingView>
      <View>
        <Text>{id}</Text>
      </View>
      <View>
        <Text>Question</Text>
        <TextInput
          placeholder="question here"
          onChangeText={(question) => {
            setEditQuestion(question);
            setCards((data) =>
              data.map((item) =>
                item.id === id ? { ...item, question: question } : item
              )
            );
          }}
          value={editQuestion}
        />
        <Text>Answer</Text>
        <TextInput
          placeholder="answer here"
          onChangeText={(answer) => {
            setEditAnswer(answer);
            setCards((data) =>
              data.map((item) =>
                item.id === id ? { ...item, answer: answer } : item
              )
            );
          }}
          value={editAnswer}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
