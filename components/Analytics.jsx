import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useUser } from "../context/UserContext";
import Spinner from "react-native-loading-spinner-overlay";
import { getDecks } from "../utils/api";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";

const Analytics = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentDecks, setCurrentDecks] = useState([]);

  useEffect(() => {
    getDecks().then((decks) => {
      const filteredDecks = decks.filter((deck) =>
        user.user_decks.includes(deck._id)
      );
      setCurrentDecks(filteredDecks);
      setLoading(false);
    });
  }, [user]);

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

  const dataList = [];

  const labelList = [];

  const findAveragePercent = (array, title) => {
    const average = array.reduce((a, b) => a + b, 0);
    dataList.push(Math.floor(average / (array.length - 1)) / 100);
    labelList.push(title);
    return Math.floor(average / (array.length - 1));
  };

  const chartConfig = {
    backgroundColor: "#2C2C2C",
    backgroundGradientFrom: "#2C2C2C",
    backgroundGradientTo: "#2C2C2C",
    color: (opacity = 1) => `rgba(249, 153, 9, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(249, 153, 9, ${opacity})`,
    style: {
      borderRadius: 20,
    },
  };

  const data = {
    labels: labelList,
    data: dataList,
  };

  return (
    <>
      {loading ? (
        <View style={analyticsStyle.loadingContainer}>
          <Spinner visible={loading} />
        </View>
      ) : (
        <View style={analyticsStyle.container}>
          <View style={analyticsStyle.header}>
            <Ionicons name="analytics" size={100} color="white" />
            <Text style={analyticsStyle.title}>{user.username}'s Stats</Text>
          </View>

          <View style={analyticsStyle.content}>
            <View style={analyticsStyle.column}>
              <Text style={analyticsStyle.columnHeader}>Deck Name</Text>
              {currentDecks.map((deck) => (
                <Text key={deck._id} style={analyticsStyle.text}>
                  {deck.title}
                </Text>
              ))}
            </View>
            <View style={analyticsStyle.column}>
              <Text style={analyticsStyle.columnHeader}>Average Score</Text>
              {currentDecks.map((deck) => (
                <Text key={deck._id} style={analyticsStyle.text}>
                  {findAveragePercent(deck.user_percent, deck.title)}%
                </Text>
              ))}
            </View>
          </View>
          <View style={analyticsStyle.chart}>
            <ProgressChart
              data={data}
              width={Dimensions.get("window").width}
              height={150}
              strokeWidth={10}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>
      )}
    </>
  );
};

const analyticsStyle = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  chart: {
    marginTop: 30,
    marginRight: 70,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F99909",
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  column: {
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  columnHeader: {
    fontWeight: "bold",
    color: "#F99909",
    marginBottom: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#F9F9F9",
    marginBottom: 5,
  },
  totalText: {
    fontWeight: "bold",
    color: "#F9F9F9",
    marginTop: 10,
  },
  logout: {
    marginTop: 30,
    fontWeight: "bold",
    color: "#F9F9F9",
  },
  button: {
    backgroundColor: "#f19100",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Analytics;
