export const decodeHtml = (text: string) => {
  text = text.replace(/%/g, "");
  // eslint-disable-next-line prettier/prettier
  text = text.replace(/&quot;/g, "\"");
  text = text.replace(/&#039;/g, "'");
  text = text.replace(/&aacute;/gi, "á");
  text = text.replace(/&ntilde;/gi, "ñ");
  text = text.replace(/&pi;/gi, "π");
  text = text.replace(/&ldquo;/gi, "“");
  text = text.replace(/&rdquo;/gi, "”");
  return text;
};
