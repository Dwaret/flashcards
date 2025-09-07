import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  onPress?: () => void;
  disableCondition?: boolean;
  buttonText: string;
  fontSize?: number;
  styleText?: StyleProp<TextStyle>;
  styleButton?: StyleProp<ViewStyle>;
}

export default function CustomButton({
  onPress = () => false,
  disableCondition = false,
  buttonText,
  styleText,
  styleButton,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disableCondition}
      activeOpacity={0.6}
    >
      <View
        style={[
          localStyle.buttons,
          {
            backgroundColor: disableCondition ? "#A9CFC6" : "#1ABC9C",
          },
          styleButton,
        ]}
      >
        <Text style={[localStyle.text, styleText]}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  text: {
    color: "#2C3E50",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  buttons: {
    alignItems: "center",
    width: 100,
    borderRadius: 50,
    cursor: "pointer",
  },
});
