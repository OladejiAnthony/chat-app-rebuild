import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const navigation = useNavigation();

  const user = {
    name: name,
    email: email,
    password: password,
    image: image,
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.5:8000/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log({ response });

      if (response.status !== 200) {
        throw new Error("Network error");
      }

      Alert.alert(
        "Registration Successful",
        "You have been registered successfuly"
      );

      //console.log("data:", response.data);
      //set input field to empty string
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    } catch (error) {
      console.error("Error posting data", error);
      Alert.alert(
        "Registration Failed",
        "There was an error registering your account. Please try again."
      );
    }
  };

  //console.log({user})

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#4A55A2", fontWeight: "600" }}>
              Register
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
              Register To Your Account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Name
              </Text>

              <TextInput
                style={{
                  fontSize: name ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 250,
                }}
                placeholder="enter Your Name"
                placeholderTextColor={"black"}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Email
              </Text>

              <TextInput
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 250,
                }}
                placeholder="enter Your Email"
                placeholderTextColor={"black"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Password
              </Text>

              <TextInput
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 250,
                }}
                placeholder="Password"
                placeholderTextColor={"black"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                Image
              </Text>

              <TextInput
                style={{
                  fontSize: image ? 18 : 18,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  width: 250,
                }}
                placeholder="Image"
                placeholderTextColor={"black"}
                value={image}
                onChangeText={(text) => setImage(text)}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              style={{
                width: 200,
                backgroundColor: "#4A55A2",
                padding: 15,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Already have an account ? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
