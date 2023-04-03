import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postCard } from "../utils/api";

const CreateCard = ({ navigation, route }) => {
  const { newDeckID } = route.params;
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  console.log(newDeckID, "<<newDeckID destructured in createCard");

  const handleCreateCard = () => {
    postCard(cardFront, cardBack, newDeckID).then(() => {
      console.log("card created");
    });
    navigation.navigate("Decks");
  };

  return (
    <View style={cardStyles.container}>
      <MaterialCommunityIcons
        name="card-text-outline"
        size={50}
        color="#F9F9F9"
      />
      <View
        style={
          cardFront ? cardStyles.enterTextActive : cardStyles.enterTextInactive
        }
      >
        <Text style={cardStyles.label}>Front</Text>
        <TextInput
          maxLength={70}
          multiline={true}
          numberOfLines={5}
          style={cardStyles.inputBox}
          placeholder="Enter your question here"
          value={cardFront}
          onChangeText={(text) => setCardFront(text)}
        />
      </View>
      <View
        style={
          cardBack ? cardStyles.enterTextActive : cardStyles.enterTextInactive
        }
      >
        <Text style={cardStyles.label}>Back</Text>
        <TextInput
          maxLength={70}
          multiline={true}
          numberOfLines={5}
          style={cardStyles.inputBox}
          placeholder="Enter your answer here"
          value={cardBack}
          onChangeText={(text) => setCardBack(text)}
        />
      </View>
      <View
        style={
          cardFront && cardBack
            ? cardStyles.buttonActive
            : cardStyles.buttonInactive
        }
      >
        <TouchableOpacity
          disabled={cardFront && cardBack ? false : true}
          onPress={handleCreateCard}
        >
          <Text style={cardStyles.buttonText}>Create Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#F9F9F9",
    margin: 50,
    padding: 20,
    backgroundColor: "#BAB484",
    borderRadius: 8,
  },
  inputBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F9F9F9",
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  enterTextInactive: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 150,
    backgroundColor: "#E3BC98",
    borderColor: "#F9F9F9",
    borderWidth: 2,
    marginTop: 10,
  },
  enterTextActive: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 150,
    backgroundColor: "#F99909",
    borderColor: "#F9F9F9",
    borderWidth: 2,
    marginTop: 10,
  },
  buttonText: {
    color: "#F5F3E5",
    fontWeight: "bold",
    fontSize: 24,
  },
  buttonActive: {
    fontWeight: "bold",
    padding: 10,
    elevation: 10,
    backgroundColor: "#F99909",
    alignItems: "center",
    margin: 10,
    width: "90%",
    borderRadius: 10,
    shadowColor: "#F9F9F9",
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  buttonInactive: {
    fontWeight: "bold",
    padding: 10,
    elevation: 10,
    backgroundColor: "#E3BC98",
    alignItems: "center",
    margin: 10,
    width: "90%",
    borderRadius: 10,
    shadowColor: "#F9F9F9",
    shadowRadius: 10,
    shadowOpacity: 0,
  },
  label: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#F9F9F9",
  },
});

export default CreateCard;
