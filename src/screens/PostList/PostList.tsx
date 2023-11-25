import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, RefreshControl } from "react-native";

import { useGetPostsQuery } from "../../store/api/postsApi";

const PostList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetPostsQuery({});

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ListItem key={item.id}>
              <ListItem.Content>
                <ListItem.Title>{`${item.text} ${item.createdDate}`}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default PostList;
