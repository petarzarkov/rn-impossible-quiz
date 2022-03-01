/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Quiz } from "./screens";
import { colors } from "./theme";
import { requests } from "./services";
import { localization } from "./config";
import { base } from "./styles";
import { QuestionParsed } from "./contracts";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isDarkMode = useColorScheme() === "dark";
  const [lang, setLang] = useState<keyof typeof localization>("en");
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionParsed[] | null>(null);

  const refreshQuestions = async () => {
    setLoading(true);
    const newQuestions = await requests.fetchQuestions();
    if (newQuestions) {
      setQuestions(newQuestions);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshQuestions();
  }, []);

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
        {isLoading ? (
          <View style={[base.container, base.horizontal]}>
            <ActivityIndicator size="large" animating color={colors.accent} />
          </View>
        ) : (
          <Quiz
            {...{
              lang,
              setLang,
              questions: questions as unknown as QuestionParsed[],
              refreshQuestions,
              localization: localization[lang],
            }}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
