import React from "react";
import { storeData, getData } from "../store";
import { QuizBaseProvider, QuizContext, QuizSettings } from "./QuizContext";
import { Dark } from "../theme";
import { getTheme } from "../utils/getTheme";
import { localization } from "../config";
import { requests } from "../services";
import { QuestionParsed } from "../contracts";

export class QuizProvider extends React.Component {
  state: QuizBaseProvider = {
    theme: "dark",
    numberOfQ: "random",
    lang: "en",
    category: "All",
    colors: Dark,
    localization: localization.en,
    isLoading: false,
    questions: [],
  };

  storeQuestions = (questions: QuestionParsed[]) => {
    void storeData("latest_questions", JSON.stringify(questions));
  };

  refreshQuestions = async () => {
    this.setState({ isLoading: true });
    const newQuestions = await requests.fetchQuestions(this.state.numberOfQ, this.state.category);
    if (newQuestions) {
      this.setState({ questions: newQuestions });
      void storeData("latest_questions", JSON.stringify(newQuestions));
    }

    this.setState({ isLoading: false });
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const settings = await getData<QuizSettings>("latest_settings");
    if (settings) {
      this.setState({
        ...(settings.theme && {
          theme: settings.theme,
          colors: getTheme(settings.theme).colors,
        }),
        ...(settings.numberOfQ && {
          numberOfQ: settings.numberOfQ,
        }),
        ...(settings.lang && { lang: settings.lang }),
        ...(settings.category && { category: settings.category }),
      });
    }

    const questions = await getData<QuestionParsed[]>("latest_questions");
    if (!questions) {
      void this.refreshQuestions();
      return;
    }

    this.setState({ questions, isLoading: false });
  }

  setCategory = (c: string) => {
    this.setState({ category: c });
    void storeData("latest_settings", {
      theme: this.state.theme,
      numberOfQ: this.state.numberOfQ,
      lang: this.state.lang,
      category: c,
    });
  };

  setLang = (l: "bg" | "en") => {
    this.setState({ lang: l, localization: localization[l] });
    void storeData("latest_settings", {
      theme: this.state.theme,
      numberOfQ: this.state.numberOfQ,
      category: this.state.category,
      lang: l,
    });
  };

  setNumberOfQ = (n: number | "random") => {
    this.setState({ numberOfQ: n });
    void storeData("latest_settings", {
      theme: this.state.theme,
      numberOfQ: n,
      category: this.state.category,
      lang: this.state.lang,
    });
  };

  setTheme = (t: "light" | "dark") => {
    this.setState({ theme: t, colors: getTheme(t).colors });
    void storeData("latest_settings", {
      theme: t,
      category: this.state.category,
      numberOfQ: this.state.numberOfQ,
      lang: this.state.lang,
    });
  };

  render() {
    return (
      <QuizContext.Provider
        value={{
          ...this.state,
          setCategory: this.setCategory,
          storeQuestionsInPlace: this.storeQuestions,
          refreshQuestions: this.refreshQuestions,
          setTheme: this.setTheme,
          setLang: this.setLang,
          setNumberOfQ: this.setNumberOfQ,
        }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}
