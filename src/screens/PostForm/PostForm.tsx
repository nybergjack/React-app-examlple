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
import { useSelector } from "react-redux";

import { useCreatePostMutation } from "../../store/api/postsApi";

export const PostForm = (props, route) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const date = new Date().toLocaleDateString();

  const { navigation } = props;
  const { t } = useTranslation();

  const toast = useToast();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const [text, setText] = useState("");
  //const [createdBy, setcreatedBy] = route?.params?.user || loggedInAs;
  const [createdBy] = useState(loggedInAs);
  const [createdDate] = useState(date);
  console.log(createdDate);

  const handleSubmit = () => {
    if (text !== "") {
      setText("");

      createPost({
        post: {
          text,
          createdBy,
          createdDate,
        },
      })
        .then(() => {
          toast.show(
            `Post är skapad av : ${loggedInAs.firstName} ${loggedInAs.lastName}`,
            {
              type: "success",
              placement: "top",
              duration: 4000,
              animationType: "slide-in",
            },
          );

          //navigation.navigate("UserList");
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
          <Text>Skapa post</Text>

          <Input
            placeholder="Text"
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
            returnKeyType="next"
            blurOnSubmit={false}
            disabled={isLoading}
          />

          {/* <Input
            placeholder="LastName"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
            ref={lastNameRef}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            disabled={isLoading}
          /> */}

          <Button
            title="Skapa post"
            //title={t("createUser")}
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
