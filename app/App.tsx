import React from "react";
import { Entry } from "./screens";
import { QuizProvider } from "./context";

const App = () => {
  return (
    <QuizProvider>
      <Entry />
    </QuizProvider>
  );
};

export default App;
