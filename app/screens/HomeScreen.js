import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../components/User";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  //console.log({ userId });
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

   // Fetch userId from token
   useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const response = await axios.post(
            `http://192.168.0.5:8000/usersToken`,
            { token }
          );
          setUserId(response.data.userId);
        } else {
          Alert.alert("Error", "No auth token found");
        }
      } catch (error) {
        console.error("Error retrieving userId", error);
      }
    };

    fetchUserId();
  }, [setUserId]);

  // Fetch users once userId is set
  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://192.168.0.5:8000/users/${userId}`
          );
          setUsers(response.data);
        } catch (error) {
          console.log("Error retrieving users", error);
        }
      }
    };

    fetchUsers();
  }, [userId]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       //console.log({ token });

  //       if (token) {
  //         try {
  //           const response = await axios.post(
  //             `http://192.168.0.5:8000/usersToken`,
  //             { token }
  //           );
  //           //console.log({ response });
  //           //console.log("response data: ", response.data);
  //           //save response to userId state
  //           setUserId(response.data.userId);
  //         } catch (error) {
  //           console.log("error retrieving userId", error);
  //         }
  //         console.log({ userId });

  //         try {
  //           const response = await axios.get(
  //             `http://192.168.0.5:8000/users/${userId}`
  //           );
  //           //console.log({ response });
  //           //console.log("get response data :", response.data);
  //           //save response to users state
  //           setUsers(response.data);
  //         } catch (error) {
  //           console.log("error retrieving users", error);
  //         }

  //         console.log({ users });
  //       } else {
  //         Alert.alert("Error", "No auth token found");
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token or fetching users", error);
  //     }
  //   };

  //   fetchUsers();
  // }, [setUserId]);

  //console.log(users[0].name)

  return (
    <View style={{ marginTop: 50 }}>
      {users.map((item, index) => (
        <User key={index} item={item} />
      ))}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});


/*
The issue where data doesn't display on the UI until you edit and save the file is likely related to the asynchronous nature of your useEffect hook and how you're handling the user ID (userId). The main problem appears to be that fetchUsers depends on userId, but userId might not be set by the time you're trying to fetch users.

To resolve this issue, you should restructure your useEffect hooks to ensure that fetchUsers only runs when userId is available. This can be achieved by splitting your data fetching logic into two separate useEffect hooks. One useEffect will fetch the userId and store it in state, and another useEffect will fetch the users once the userId is available.
*/