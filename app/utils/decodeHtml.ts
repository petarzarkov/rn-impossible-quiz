import { htmlSymbols } from "./htmlSymbols";

export const decodeHtml = (text: string) => {
  if (!text) {
    return;
  }
  try {
    const decoded = text.replace(/&(.+?);/gi, (match: string) => {
      if (htmlSymbols[match]) {
        return htmlSymbols[match];
      }
      return match;
    });

    return decoded;
  } catch (error) {
    return text;
  }
};
