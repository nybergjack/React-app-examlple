import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";

import { useUpdateUserMutation } from "../../store/api/usersApi";
import InputField from "../TextInput/TextInput";

interface Users {
  id: string;
  firstName: string;
  lastName: string;
}

type props = {
  user: Users;
  refetch: () => void;
};

const UpdateUser = ({ user, refetch }: props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const submitHandler = async () => {
    try {
      await updateUser({
        user: {
          ...user,
          firstName,
          lastName,
        },
      });
      refetch();
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button onPress={() => setIsEdit(!isEdit)}>Redigera</Button>

      {isEdit && (
        <View>
          <InputField
            value={firstName}
            placeholder="Förnamn"
            onChangeText={(firstName: React.SetStateAction<string>) =>
              setFirstName(firstName)
            }
          />
          <InputField
            value={lastName}
            placeholder="Efternamn"
            onChangeText={(lastName: React.SetStateAction<string>) =>
              setLastName(lastName)
            }
          />
          <Button
            onPress={() => {
              submitHandler();
            }}
          >
            Skicka
          </Button>
        </View>
      )}
    </View>
  );
};

export default UpdateUser;
