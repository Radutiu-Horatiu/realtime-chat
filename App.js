import React  from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/rootNavigation";
import { createStackNavigator } from "@react-navigation/stack";

import Main from './components/Main'
import Chat from './components/Chat'

export default function App() {

  const Stack = createStackNavigator();

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator mode="modal" >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}