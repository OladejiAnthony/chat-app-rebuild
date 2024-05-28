import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";

const UserChat = ({ item }) => {
  //console.log("item", item);

  const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.5:8000/messages/${userId}/${item._id}`
      );
      //console.log("user response: ", response);
      const data = await response.json();
      //console.log("user response data: ", response.data);

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messages", response.status.message);
      }
      console.log({ messages });
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  //get Last Message functon
  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );
    const n = userMessages.length;
    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log({ lastMessage });

  //formatTime function
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };


  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Messages", {
          recepientId: item._id,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />
      {/*Text */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )}
      </View>
      {/*Time */}
      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
