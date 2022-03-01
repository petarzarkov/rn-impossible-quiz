import { request } from "./request";
import defaultQuestions from "./defaultQuestions";
import { decodeHtml, randomNumber } from "../utils";
import { QuestionRaw, QuestionParsed } from "../contracts";

const getQuestions = async (): Promise<QuestionParsed[]> => {
  const timeout = 2000;
  const opentdb: Promise<QuestionParsed[] | undefined> = request({
    url: `https://opentdb.com/api.php?amount=${randomNumber(1, 50)}`,
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
    url: `https://api.trivia.willfry.co.uk/questions?limit=${randomNumber(
      1,
      20,
    )}`,
    timeout,
  }).then(r => {
    if (r.status === 200 && r?.result?.length) {
      return r.result.map((q: any) => {
        const correctAnswer = decodeHtml(q.correctAnswer);
        return {
          question: q.question,
          answers: [...q.incorrectAnswers.map(decodeHtml), correctAnswer].sort(
            () => Math.random() - 0.5,
          ),
          category: q.category,
          difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
        };
      });
    }
  });

  const bongo: Promise<QuestionParsed[] | undefined> = request({
    url: `https://beta-trivia.bongo.best/?limit=${randomNumber(1, 10)}`,
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
          difficulty: q.difficulty,
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

  return parsed && parsed.length ? parsed : defaultQuestions;
};

export const requests = {
  fetchQuestions: getQuestions,
};
