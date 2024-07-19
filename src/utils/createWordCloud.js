import { stemmer } from "stemmer";
import { removeStopwords, eng, swe } from "stopword";

const processMessages = (messages) => {
  const customStopWords = ["interesting", "really"];
  const combinedStopWords = [...eng, ...swe, ...customStopWords];

  let uniqueWords = new Set();

  messages.forEach((message) => {
    const tokens = message.toLowerCase().split(/\s+/);
    const filteredTokens = removeStopwords(tokens, combinedStopWords)
      .filter((token) => token.length > 3)
      .map((token) => stemmer(token));
    filteredTokens.forEach((token) => uniqueWords.add(token));
  });

  // Limitar a 130 palabras únicas
  const limitedWords = Array.from(uniqueWords).slice(0, 130);

  return limitedWords;
};

export { processMessages };
