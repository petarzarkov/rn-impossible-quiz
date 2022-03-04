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
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { storeData } from "./store";

const Tab = createBottomTabNavigator();

const App = () => {
  const isInitialMount = useRef(true);
  const { getItem: getSettings } = useAsyncStorage("@storage_latest_settings");
  const [theme, setThemeLocal] = useState(useColorScheme() || "dark");

  const [themeColors, setColors] = useState(getTheme(theme));
  const isDarkMode = themeColors.isDarkMode;
  const colors = themeColors.colors;
  const [lang, setLangLocal] = useState<keyof typeof localization>("en");
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionParsed[] | null>(null);
  const [numberOfQ, setNumberOfQLocal] = useState<number | "random">("random");
  const { getItem: getQuestions, setItem: storeQuestions } = useAsyncStorage(
    "@storage_latest_questions",
  );

  const setTheme = (t: "light" | "dark") => {
    setThemeLocal(t);
    storeData("latest_settings", { theme: t, numberOfQ, lang });
  };

  const setLang = (l: "bg" | "en") => {
    setLangLocal(l);
    storeData("latest_settings", { theme, numberOfQ, lang: l });
  };

  const setNumberOfQ = (n: number | "random") => {
    setNumberOfQLocal(n);
    storeData("latest_settings", { theme, numberOfQ: n, lang });
  };

  const refreshQuestions = async () => {
    setLoading(true);
    const newQuestions = await requests.fetchQuestions(numberOfQ);
    if (newQuestions) {
      setQuestions(newQuestions);
      storeQuestions(JSON.stringify(newQuestions));
    }

    setLoading(false);
  };

  const onMount = async () => {
    setLoading(true);
    const settingsRaw = await getSettings();
    if (settingsRaw) {
      try {
        const settingsParsed = JSON.parse(settingsRaw);

        if (settingsParsed.theme) {
          setThemeLocal(settingsParsed.theme);
        }

        if (settingsParsed.numberOfQ) {
          setNumberOfQLocal(settingsParsed.numberOfQ);
        }

        if (settingsParsed.lang) {
          setLangLocal(settingsParsed.lang);
        }
      } catch (error) {}
    }
    const questionsRaw = await getQuestions();
    if (!questionsRaw) {
      refreshQuestions();
      return;
    }

    try {
      const questionsParsed = JSON.parse(questionsRaw) as QuestionParsed[];
      setQuestions(questionsParsed);
      setLoading(false);
    } catch (error) {
      refreshQuestions();
      return;
    }
  };

  useEffect(() => {
    // Did mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onMount();
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
              tabBarActiveBackgroundColor: colors.background,
              tabBarInactiveBackgroundColor: colors.border,
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
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
                    storeQuestionsInPlace: storeQuestions,
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
