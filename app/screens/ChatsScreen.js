import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { UserType } from "../../UserContext";
import axios from "axios";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log({ userId });
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.5:8000/accepted-friends/${userId}`
        );

        //console.log({ response });
        //console.log("data:", response.data);

        if (response.status === 200) {
          setAcceptedFriends(response.data);
        }
      } catch (error) {
        console.log("error showing the accepted friends:", error.message);
      }

      //console.log({ acceptedFriends });
    };

    acceptedFriendsList();
  },[userId]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable style={{}}>
        {/* <Text>{acceptedFriends[0].email}</Text> */}
        {acceptedFriends.map((item, index) => {
          console.log({ index, item });
          return <UserChat key={index} item={item} />;
        })}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
