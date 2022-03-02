import { request } from "./request";
import defaultQuestions from "./defaultQuestions";
import { decodeHtml, randomNumber } from "../utils";
import { QuestionRaw, QuestionParsed } from "../contracts";

const getNumbers = (n: number): [number, number, number] => {
  switch (n) {
    case 20:
      return [12, 5, 3];
    case 35:
      return [16, 12, 7];
    case 50:
      return [30, 15, 5];
    case 80:
      return [50, 20, 10];
    default: {
      return [50, 20, 10];
    }
  }
};

const getQuestions = async (
  number: "random" | number,
): Promise<QuestionParsed[]> => {
  const timeout = 2000;
  const pickedNumbers =
    number === "random"
      ? [randomNumber(1, 50), randomNumber(1, 20), randomNumber(1, 10)]
      : getNumbers(number);

  const opentdb: Promise<QuestionParsed[] | undefined> = request({
    url: `https://opentdb.com/api.php?amount=${pickedNumbers[0]}`,
    timeout,
  }).then(r => {
    if (r.status === 200) {
      const data = r.result;
      if (data && data.results && data.results.length) {
        return data.results.map((q: QuestionRaw) => {
          const correctAnswer = decodeHtml(q.correct_answer);
          return {
            question: decodeHtml(q.question),
            answers: [
              ...q.incorrect_answers.map(decodeHtml),
              correctAnswer,
            ].sort(() => Math.random() - 0.5),
            correctAnswer,
            category: q.category,
            difficulty: q.difficulty,
          };
        });
      }
    }
  });

  const willfry: Promise<QuestionParsed[] | undefined> = request({
    url: `https://api.trivia.willfry.co.uk/questions?limit=${pickedNumbers[1]}`,
    timeout,
  }).then(r => {
    if (r.status === 200 && r?.result?.length) {
      return r.result.map((q: any) => {
        const correctAnswer = decodeHtml(q.correctAnswer);
        const incorrectAnswers =
          q.incorrectAnswers?.length > 3
            ? q.incorrectAnswers.slice(0, 3)
            : q.incorrectAnswers;
        return {
          question: q.question,
          answers: [...incorrectAnswers.map(decodeHtml), correctAnswer].sort(
            () => Math.random() - 0.5,
          ),
          category: q.category,
          difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
        };
      });
    }
  });

  const bongo: Promise<QuestionParsed[] | undefined> = request({
    url: `https://beta-trivia.bongo.best/?limit=${pickedNumbers[2]}`,
    timeout,
  }).then(r => {
    if (r.status === 200 && r?.result?.length) {
      const data = r.result;
      return data.map((q: QuestionRaw) => {
        const correctAnswer = decodeHtml(q.correct_answer);
        return {
          question: decodeHtml(q.question),
          answers: [...q.incorrect_answers.map(decodeHtml), correctAnswer].sort(
            () => Math.random() - 0.5,
          ),
          correctAnswer,
          category: q.category || "Unknown",
          difficulty: q.difficulty || "easy",
        };
      });
    }
  });

  const result = await Promise.all([opentdb, willfry, bongo]);
  const parsed = result.reduce((prev, curr) => {
    if (curr?.length) {
      prev = prev ? [...prev, ...curr] : [...curr];
    }
    return prev;
  }, []);

  return parsed && parsed.length
    ? parsed.sort(() => Math.random() - 0.5)
    : defaultQuestions;
};

export const requests = {
  fetchQuestions: getQuestions,
};
