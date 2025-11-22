import { request } from "./request";
import defaultQuestions from "./defaultQuestions";
import { decodeHtml, randomNumber } from "../utils";
import { QuestionRaw, QuestionParsed } from "../contracts";
import { settings } from "../config";
import { getData } from "../store";

const getNumbers = (n: number): number[] => {
  switch (n) {
    case 25:
      return [25];
    case 50:
      return [50];
    case 75:
      return [50, 25];
    case 100:
      return [50, 50];
    case 125:
      return [50, 50, 25];
    case 150:
      return [50, 50, 50];
    default: {
      return [25];
    }
  }
};

export const getQuestions = async (
  number: "random" | number,
  category: string,
): Promise<QuestionParsed[]> => {
  const timeout = 2000;
  const pickedNumbers =
    number === "random"
      ? [randomNumber(1, 50), randomNumber(1, 50), randomNumber(1, 50)]
      : getNumbers(number);

  const categoryId = settings.categories.find(c => c.name === category)?.id;
  const promises = pickedNumbers.map(num => {
    const req: Promise<QuestionParsed[] | undefined> = request<{ results: QuestionRaw[] } | undefined>({
      url: categoryId ? `https://opentdb.com/api.php?amount=${num}&category=${categoryId}` : `https://opentdb.com/api.php?amount=${num}`,
      timeout,
    }).then(r => {
      if (r.status === 200) {
        const data = r.result;
        if (data && data.results && data.results.length) {
          return data.results.map((q: QuestionRaw) => {
            const correctAnswer = decodeHtml(q.correct_answer);
            if (!correctAnswer) {
              console.log("No correct answer opentdb", { q, res: data.results });
            }
            return {
              question: decodeHtml(q.question),
              answers: [
                ...new Set([
                  ...q.incorrect_answers.map(decodeHtml),
                  correctAnswer,
                ]),
              ].sort(() => Math.random() - 0.5),
              correctAnswer,
              category: q.category,
              difficulty: q.difficulty,
            };
          });
        }
      }
    });
    return req;
  });

  const result = await Promise.all(promises);
  const parsed = result.reduce((prev, curr) => {
    if (curr?.length) {
      prev = prev ? [...prev, ...curr] : [...curr];
    }
    return prev;
  }, []);

  if (!parsed?.length) {
    const lastQuestions = await getData<QuestionParsed[]>("latest_questions");

    return lastQuestions || defaultQuestions;
  }

  return parsed.sort(() => Math.random() - 0.5);
};
