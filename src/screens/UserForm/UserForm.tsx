import { Button, Input } from "@rneui/themed";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import { useCreateUserMutation } from "../../store/api/usersApi";

export const UserForm = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  const toast = useToast();
  const lastNameRef = useRef(null);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = () => {
    if (firstName !== "" && lastName !== "") {
      setFirstName("");
      setLastName("");

      createUser({
        user: {
          firstName,
          lastName,
        },
      })
        .then(() => {
          toast.show(`Användaren ${firstName} ${lastName} är skapad `, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });

          navigation.navigate("UserList");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      console.log("Du måste skriva in nåt");
      toast.show("Du måste skriva in båda fälten", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>Skapa konto</Text>

          <Input
            placeholder="Firstname"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
            blurOnSubmit={false}
            disabled={isLoading}
          />

          <Input
            placeholder="LastName"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
            ref={lastNameRef}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            disabled={isLoading}
          />

          <Button
            //title="Create user"
            title={t("createUser")}
            onPress={() => handleSubmit()}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 36,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 16,
  },
});
