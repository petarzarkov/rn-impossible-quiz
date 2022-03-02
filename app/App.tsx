/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { requests } from "./services";
import { localization } from "./config";
import { base } from "./styles";
import { QuestionParsed } from "./contracts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Quiz, Settings } from "./screens";
import { getTheme } from "./utils";

const Tab = createBottomTabNavigator();

const App = () => {
  const isInitialMount = useRef(true);
  const [theme, setTheme] = useState(useColorScheme());
  const [themeColors, setColors] = useState(getTheme(theme));
  const isDarkMode = themeColors.isDarkMode;
  const colors = themeColors.colors;
  const [lang, setLang] = useState<keyof typeof localization>("en");
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionParsed[] | null>(null);
  const [numberOfQ, setNumberOfQ] = useState<number | "random">("random");

  const refreshQuestions = async () => {
    setLoading(true);
    const newQuestions = await requests.fetchQuestions(numberOfQ);
    if (newQuestions) {
      setQuestions(newQuestions);
    }

    setLoading(false);
  };

  useEffect(() => {
    // Did mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      refreshQuestions();
      return;
    }
  });

  useEffect(() => {
    setColors(getTheme(theme));
  }, [theme]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={
          isDarkMode
            ? require("./assets/images/stars-dark.png")
            : require("./assets/images/stars-light.png")
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
              tabBarStyle: { borderTopWidth: 0 },
              tabBarActiveBackgroundColor: colors.primaryLight,
              tabBarInactiveBackgroundColor: colors.primary,
              headerShown: false,
              tabBarActiveTintColor: colors.accent,
              tabBarInactiveTintColor: colors.primaryLight,
            }}
          >
            <Tab.Screen
              name="Quiz"
              options={{
                tabBarLabel: "Quiz",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome
                    name="question-circle"
                    color={color}
                    size={size}
                  />
                ),
              }}
            >
              {props => (
                <Quiz
                  {...props}
                  {...{
                    colors,
                    isLoading,
                    lang,
                    setLang,
                    questions: questions as unknown as QuestionParsed[],
                    refreshQuestions,
                    localization: localization[lang],
                  }}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Settings"
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            >
              {props => (
                <Settings
                  {...props}
                  {...{
                    colors,
                    localization: localization[lang],
                    lang,
                    setLang,
                    numberOfQ,
                    setNumberOfQ,
                    refreshQuestions,
                    theme,
                    setTheme,
                  }}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
