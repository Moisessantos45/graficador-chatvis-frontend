import { stemmer } from "stemmer";
import { eng, swe } from "stopword";

const WORD_LIMIT = 130;
const MIN_WORD_LENGTH = 3;

const customStopWords = ["interesting", "really"];
const combinedStopWords = new Set([...eng, ...swe, ...customStopWords]);

const processMessages = (messages) => {
  if (!Array.isArray(messages) || !messages.length) {
    return [];
  }

  return messages
    .flatMap(message => 
      message.toLowerCase()
        .split(/\s+/)
        .filter(token => 
          token.length > MIN_WORD_LENGTH && 
          !combinedStopWords.has(token)
        )
        .map(stemmer)
    )
    .filter((value, index, self) => self.indexOf(value) === index)
    .slice(0, WORD_LIMIT);
};

export { processMessages };
