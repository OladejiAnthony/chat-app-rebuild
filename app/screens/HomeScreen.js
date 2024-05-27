import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  console.log({ userId });
  const [users, setUsers] = useState([]);

  //style header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log({ token });

        if (token) {
          //post token to userId
          try {
            const response = await axios.post(
              `http://192.168.0.5:8000/usersToken`,
              { token }
            );
            //console.log({ response });
            //console.log("response data: ", response.data);
            setUserId(response.data.userId);
          } catch (error) {
            console.log("error retrieving userId", error);
          }

          console.log({ userId });

          try {
            const response = await axios.get(`http://192.168.0.5:8000/users/${userId}`)
            console.log({response})
            console.log("get response data :", response.data);
            setUsers(response.data);
            
          } catch (error) {
            console.log("error retrieving users", error);
          }

          console.log({users});

        } else {
          Alert.alert("Error", "No auth token found");
        }
      } catch (error) {
        console.error("Error decoding token or fetching users", error);
      }
    };

    fetchUsers();
  }, [setUserId]);

  

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
