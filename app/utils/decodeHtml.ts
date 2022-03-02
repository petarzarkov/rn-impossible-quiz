export const decodeHtml = (text: string) => {
  if (!text) {
    return;
  }
  try {
    text = text.trim();
    text = text.replace(/%/g, "");
    // eslint-disable-next-line prettier/prettier
    text = text.replace(/&quot;/g, "\"");
    text = text.replace(/&#039;/g, "'");
    text = text.replace(/&aacute;/gi, "á");
    text = text.replace(/&ntilde;/gi, "ñ");
    text = text.replace(/&pi;/gi, "π");
    text = text.replace(/&ldquo;/gi, "“");
    text = text.replace(/&rdquo;/gi, "”");
    text = text.replace(/&uacute;/gi, "ú");
    text = text.replace(/&atilde;/gi, "ã");
    text = text.replace(/&oacute;/gi, "ó");
    text = text.replace(/&uuml/gi, "ü");
    return text;
  } catch (error) {
    return text;
  }
};
