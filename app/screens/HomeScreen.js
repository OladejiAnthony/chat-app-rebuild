import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";

const HomeScreen = () => {

  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  console.log({userId})


  return (
    <View>
      <View style={{ padding: 10 }}>
      
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
