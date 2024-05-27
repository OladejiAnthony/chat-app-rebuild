import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../../UserContext";

const User = ({ item }) => {
  console.log({ item });
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      {/*Button Section */}
      <TouchableOpacity
        style={{
          backgroundColor: "#82CD47",
          padding: 10,
          width: 105,
          borderRadius: 6,
        }}
      >
        {/*Friend request accepted */}
        <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});
