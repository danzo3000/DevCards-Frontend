import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postDeck } from "../utils/api";
import { useUser } from "../context/UserContext";

const CreateDeck = ({ navigation, route }) => {
  const { user, updateUser } = useUser();

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const { setDeckAdded } = route.params;

  const handleCreateDeck = () => {
    postDeck(deckName, deckDescription, user._id).then((deck) => {
      const newDeckID = deck._id;
      updateUser({ ...user, user_decks: [...user.user_decks, newDeckID] });
      navigation.navigate("CreateCard", { newDeckID });
      setDeckAdded(true);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={createDeckStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
      >
        <MaterialCommunityIcons
          name="cards-outline"
          size={50}
          color="#F99909"
        />
        <View style={createDeckStyles.label}>
          <View style={createDeckStyles.innerBorder}>
            {/* <Text style={createDeckStyles.boldText}>Name</Text> */}
            <TextInput
              style={createDeckStyles.inputBox}
              placeholder="Enter Deck Name"
              placeholderTextColor="white"
              value={deckName}
              onChangeText={(text) => {
                setDeckName(text);
              }}
            />
          </View>
        </View>
        <View style={createDeckStyles.label}>
          <View style={createDeckStyles.innerBorder}>
            {/* <Text style={createDeckStyles.boldText}>Description</Text> */}
            <TextInput
              style={createDeckStyles.inputBox}
              maxLength={30}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter Deck Description"
              placeholderTextColor="white"
              value={deckDescription}
              onChangeText={(text) => setDeckDescription(text)}
            />
          </View>
        </View>
        <View
          style={
            deckName && deckDescription
              ? createDeckStyles.buttonActive
              : createDeckStyles.buttonInactive
          }
        >
          <TouchableOpacity
            disabled={deckName && deckDescription ? false : true}
            onPress={handleCreateDeck}
          >
            <Text style={createDeckStyles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const createDeckStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2c2c2c",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    padding: 10,
    elevation: 5,
    backgroundColor: "#2c2c2c",
    color: "black",
    alignItems: "flex-start",
    margin: 10,
    width: "70%",
    borderRadius: 10,
    borderColor: "#F99909",
    borderWidth: 3,
  },

  button: {
    fontWeight: "bold",
    padding: 10,
    elevation: 10,
    backgroundColor: "#F99909",
    alignItems: "center",
    margin: 10,
    width: "35%",
    borderRadius: 10,
    shadowColor: "#F9F9F9",
    shadowRadius: 10,
    shadowOpacity: 0,
  },

  buttonText: {
    color: "#2c2c2c",
    fontWeight: "bold",
    fontSize: 24,
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
  buttonActive: {
    backgroundColor: "#F99909",
    fontWeight: "bold",
    padding: 10,
    elevation: 10,
    alignItems: "center",
    margin: 10,
    width: "50%",
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  buttonInactive: {
    backgroundColor: "#E3BC98",
    fontWeight: "bold",
    padding: 10,
    elevation: 10,
    alignItems: "center",
    margin: 10,
    width: "50%",
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  inputBox: {
    height: 20,
    width: "100%",
    backgroundColor: "#2c2c2c",
    color: "white"
  },
});

export default CreateDeck;
