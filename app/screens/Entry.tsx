/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { SafeAreaView, StatusBar, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { base } from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Quiz, Settings } from ".";
import { useQuizProvider } from "../hooks";
import { getTheme } from "../utils";

const Tab = createBottomTabNavigator();

export const Entry = () => {
  const { theme, localization } = useQuizProvider() || {};
  const { isDarkMode, colors } = getTheme(theme);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          isDarkMode
            ? require("../assets/images/stars-dark.png")
            : require("../assets/images/stars-light.png")
        }
        resizeMode="cover"
        style={[base.container]}
      >
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={colors.primary}
        />
        <NavigationContainer
          theme={{
            dark: isDarkMode,
            colors: {
              ...colors,
              background: "transparent",
            },
          }}
        >
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                borderTopWidth: 0,
                width: "50%",
                alignSelf: "center",
                backgroundColor: "transparent",
                borderRadius: 15,
                opacity: 0.8,
              },
              tabBarShowLabel: false,
              tabBarItemStyle: { borderRadius: 15 },
              tabBarActiveBackgroundColor: colors.background,
              tabBarInactiveBackgroundColor: colors.border,
              headerShown: true,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.primaryLight,
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: colors.accent,
              headerStyle: { backgroundColor: colors.primary },
            }}
          >
            <Tab.Screen
              name={localization.gameTitle}
              component={Quiz}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome
                    name="question-circle"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name={localization.settingsTitle}
              component={Settings}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaView>
  );
};
