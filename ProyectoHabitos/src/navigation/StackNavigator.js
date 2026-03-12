import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen       from "../screens/HomeScreen";
import HabitDetailScreen from "../screens/HabitDetailScreen";
import ProfileScreen    from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#2563EB" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "800", fontSize: 17 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#F1F5F9" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}  // el hero header propio reemplaza el default
        />
        <Stack.Screen
          name="HabitDetail"
          component={HabitDetailScreen}
          options={{ title: "Detalle del Hábito" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Mi Perfil" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
