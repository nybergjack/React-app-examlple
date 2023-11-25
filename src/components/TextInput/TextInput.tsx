import { View, TextInput } from "react-native";

function InputField({ placeholder, onChangeText, value }) {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

export default InputField;
