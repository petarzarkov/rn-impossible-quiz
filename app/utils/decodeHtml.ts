import { htmlSymbols } from "./htmlSymbols";

export const decodeHtml = (text: string) => {
  if (!text) {
    return;
  }
  try {
    return text.replace(/&(.+);/gi, (match: string) => {
      if (htmlSymbols[match]) {
        return htmlSymbols[match];
      }
      return match;
    });
  } catch (error) {
    return text;
  }
};
