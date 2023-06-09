import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";
import CreateCard from "./CreateCard";
import SingleDeck from "./SingleDeck";


import {SignIn} from './SignIn'

import Revise from "./Revise";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Decks">
      <Stack.Screen
        name="Decks"
        component={Decks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleDeck"
        component={SingleDeck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateDeck"
        component={CreateDeck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCard"
        component={CreateCard}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen
        name="Revise"
        component={Revise}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
