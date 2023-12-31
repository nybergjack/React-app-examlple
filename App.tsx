import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { PostForm } from "./src/screens/PostForm/PostForm";
import PostList from "./src/screens/PostList/PostList";
import { Settings } from "./src/screens/Settings/Settings";
import { UserForm } from "./src/screens/UserForm/UserForm";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import UserList from "./src/screens/UserList/Userlist";
import { persistor, store } from "./src/store/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const UserListStack = createNativeStackNavigator();

const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
    </UserListStack.Navigator>
  );
};

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="UserListStack"
          component={UserListStackScreen}
          options={{
            title: "Userlist",
            tabBarIcon: (tabInfo) => (
              <Icon
                name="list"
                size={25}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="UserForm"
          component={UserForm}
          options={{
            title: "User Form",
            tabBarIcon: (tabInfo) => (
              <Icon
                name="user-plus"
                size={25}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostList}
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name="clipboard"
                size={25}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            ),
          }}
        />
        {loggedInAs ? (
          <Tab.Screen
            name="PostForm"
            component={PostForm}
            options={{
              title: "Post Form",
              tabBarIcon: (tabInfo) => (
                <Icon
                  name="plus"
                  size={25}
                  color={tabInfo.focused ? "#006600" : "#8e8e93"}
                />
              ),
            }}
          />
        ) : undefined}
        {loggedInAs ? (
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
              tabBarIcon: (tabInfo) => (
                <Icon
                  name="user"
                  size={25}
                  color={tabInfo.focused ? "#006600" : "#8e8e93"}
                />
              ),
            }}
          />
        ) : undefined}
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon
                name="gear"
                size={25}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationWrapper />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
