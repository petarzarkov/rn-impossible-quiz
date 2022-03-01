/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  useColorScheme,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./theme";
import { requests } from "./services";
import { localization } from "./config";
import { base } from "./styles";
import { QuestionParsed } from "./contracts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Quiz, Settings } from "./screens";

const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
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
    refreshQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfQ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("./assets/images/stars.png")}
        resizeMode="cover"
        style={base.container}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <NavigationContainer
          theme={{
            dark: isDarkMode,
            colors: {
              ...DefaultTheme.colors,
              background: "transparent",
              primary: colors.primary,
            },
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors.accent,
              tabBarInactiveTintColor: colors.lightBlue,
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
                    localization: localization[lang],
                    lang,
                    setLang,
                    numberOfQ,
                    setNumberOfQ,
                    refreshQuestions,
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
