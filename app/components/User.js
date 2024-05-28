import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../../UserContext";

const User = ({ item }) => {
  //console.log({ item });
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  //users friends list
  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        //get friend list of the user
        const response = await fetch(
          `http://192.168.0.5:8000/friends/${userId}`
        );

        const data = await response.json();
        //console.log({data})

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.error("Error fetching user friends", error);
      }
    };
    //console.log({ userFriends });

    fetchUserFriends();
  }, []);

  //friend request sent but not yet accepted
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.5:8000/friend-requests/sent/${userId}`
        );

        const data = await response.json();
        //console.log({data})

        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    //console.log({ friendRequests });
    fetchFriendRequests();
  }, []);

  //Add Friend Btn (POST)
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch("http://192.168.0.5:8000/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }), //POST request body to send to the backend server
      });

      //console.log(response.data);

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("Error message:", error.message);
    }
    console.log({ requestSent });
  };

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
      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          {/*Friend request accepted */}
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          {/*Friend request sent but not yet accepted */}
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <TouchableOpacity
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({});

