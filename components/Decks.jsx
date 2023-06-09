import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { getDecks } from "../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { SearchBar } from "./SearchBar";

const Decks = ({ navigation }) => {
  const [currentDecks, setCurrentDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingError, setLoadingError] = useState(false);
  const [deckAdded, setDeckAdded] = useState(false);

  console.log(user)

  useEffect(() => {
    getDecks()
      .then((decks) => {
        let filteredDecks = decks.filter((deck) =>
          user.user_decks.includes(deck._id)
        );
        if (searchQuery.length > 0) {
          filteredDecks = filteredDecks.filter((deck) =>
            deck.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setCurrentDecks(filteredDecks);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setLoadingError(true);
      });
  }, [user, searchQuery, deckAdded]);


  useFocusEffect(
    useCallback(() => {
      getDecks().then((decks) => {
        const filteredDecks = decks.filter((deck) =>
          user.user_decks.includes(deck._id)
        );
        setCurrentDecks(filteredDecks);
        setLoading(false);
      });
    }, [user])
  );

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const Deck = ({ title, description, _id }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("SingleDeck", { deck_id: _id, title })
        }
      >
        <View style={deckStyles.deckList}>
          <View style={deckStyles.innerBorder}>
            <Text style={deckStyles.name}>{title}</Text>
            <Text
              style={deckStyles.description}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      {loading ? (
        loadingError ? (
          <View style={deckStyles.center}>
            <Text style={deckStyles.errorText}>Error Loading Decks</Text>
          </View>
        ) : (
          <View style={deckStyles.container}>
            <Spinner visible={loading} />
          </View>
        )
      ) : loadingError ? (
        <View style={deckStyles.center}>
          <Text style={deckStyles.errorText}>Error Loading Decks</Text>
        </View>
      ) : (
        <View style={deckStyles.container}>
          <SearchBar handleSearch={handleSearch} />
          <FlatList
            data={currentDecks}
            renderItem={({ item }) => (
              <Deck
                title={item.title}
                description={item.description}
                _id={item._id}
              />
            )}
            keyExtractor={(item) => item._id}
          />

          <Pressable
            style={deckStyles.button}
            title="Create a New Deck"
            onPress={() =>
              navigation.navigate("CreateDeck", { setDeckAdded })
            }
          >
            <FontAwesome5 name="plus" size={34} color="black" />
          </Pressable>
        </View>
      )}
    </>
  );
};

const deckStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2c2c2c",
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  name: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 5,
    paddingBottom: 0,
    margin: 8,
    marginTop: 15,
    marginBottom: 0,
    color: "#050514",
  },
  description: {
    fontSize: 18,
    padding: 5,
    margin: 10,
    marginTop: 0,
    color: "#050514",
  },
  deckList: {
    // backgroundColor: "#818387",
    // "#F5F3E5",
    elevation: 10,
    padding: 5,
    margin: 10,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#f19100",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.87,
    shadowRadius: 4.65,
    marginBottom: 10,
    marginRight: 12,
  },
  button: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    elevation: 7,
    backgroundColor: "#61DEB5",
    borderRadius: 50,
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.37,
    shadowRadius: 4.65,
    marginBottom: 10,
    marginRight: 12,
  },
  buttonText: {
    color: "#050514",
    fontSize: 22,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontWeight:"bold",
    color: "#FF0000"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c2c2c",
}
});

export default Decks;
