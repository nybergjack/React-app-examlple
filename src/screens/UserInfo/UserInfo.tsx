import { Button, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import UpdateUser from "../../components/UpdateUser/UpdateUser";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/api/usersApi";
import { logIn, logOut } from "../../store/slices/authSlice";

export const UserInfo = ({ route, navigation }) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();
  const [userId, setUserId] = React.useState(user.id || null);

  const { data, isLoading, refetch } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  if (isLoading) return <div>Laddar...</div>;

  const userToEdit = userId ? data.find((user) => user.id === userId) : null;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text h4>{`${user.firstName} ${user.lastName}`}</Text>
      </View>
      <View style={styles.actionsContainer}>
        {loggedInAs?.id === user.id ? (
          <>
            <Button
              onPress={() => dispatch(logOut())}
              title="Logga ut"
              color="error"
            />
          </>
        ) : (
          <>
            <Button onPress={() => dispatch(logIn(user))} title="Logga in" />
            <Button onPress={() => deleteUser(user.id)}>
              Ta bort användare
            </Button>
            <UpdateUser user={userToEdit} refetch={refetch} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 36,
  },
  infoContainer: {
    marginBottom: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
});
