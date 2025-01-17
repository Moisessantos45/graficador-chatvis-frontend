import { codeKeywords } from "./dataStatic";

// Mejora 1: Nombres más descriptivos y constantes para los patrones
function parseMessageLine(text) {
  const DATE_TIME_PATTERN = /(\d{1,2}\/\d{1,2}\/\d{4})\s*(?:,)?\s*(\d{1,2}:\d{2}(?:\s*[ap]\.?\s*m\.?)?)/i;
  const SEPARATORS = [':', '-'];
  
  const match = text.match(DATE_TIME_PATTERN);
  if (!match) return null;

  const [, date, time] = match;
  const remaining = text.slice(match[0].length).trim();

  // Mejora 2: Búsqueda más eficiente del separador
  const separator = SEPARATORS.find(sep => remaining.includes(sep));
  if (!separator) return null;

  const [name, message] = remaining.split(separator, 2).map(str => str.trim());
  
  // Mejora 3: Formato de hora más robusto
  const formattedTime = time.toLowerCase()
    .replace(/\./g, '')
    .replace(/\s/g, '')
    .replace(/am$/, 'a.m.')
    .replace(/pm$/, 'p.m.');

  return { fecha: date, hora: formattedTime, nombre: name, mensaje: message };
}

// Mejora 4: Mejor manejo de memoria y claridad
function processContent(content) {
  const DATE_START_PATTERN = /^\d{1,2}\/\d{1,2}\/\d{4}/;
  const messages = [];
  let currentMessage = [];

  content.split('\n')
    .filter(line => line.trim())
    .forEach(line => {
      if (DATE_START_PATTERN.test(line)) {
        if (currentMessage.length) {
          messages.push(currentMessage.join(' '));
          currentMessage = [];
        }
        currentMessage.push(line);
      } else {
        currentMessage.push(line.trim());
      }
    });

  if (currentMessage.length) {
    messages.push(currentMessage.join(' '));
  }

  return messages.map(parseMessageLine).filter(Boolean);
}

// Mejora 5: Manejo de errores y async/await más claro
const processFiles = async (files) => {
  try {
    const results = await Promise.all(files.map(async file => {
      const content = await file.text();
      return {
        path: file.name.replace(/^Chat de WhatsApp con |\\.txt$/g, ''),
        data: processContent(content)
      };
    }));
    return results;
  } catch (error) {
    console.error('Error processing files:', error);
    throw error;
  }
};

// Mejora 6: Más eficiente y clara
const calculateInteractions = (chatHistory) => {
  const WINDOW_SIZE = 4;
  let interactions = 0;
  
  return chatHistory.slice(WINDOW_SIZE - 1).map((message, index) => {
    if (message.mensaje) interactions++;
    
    return {
      source: message.nombre,
      value: interactions,
      target: index + WINDOW_SIZE < chatHistory.length 
        ? chatHistory[index + WINDOW_SIZE].nombre 
        : ''
    };
  });
};

// Mejora 7: Más robusto y claro
const formatDates = (data) => {
  return data.map(({ fecha, mensaje }) => {
    const [day, month, year] = fecha.split('/').map(num => num.padStart(2, '0'));
    return {
      fecha: `${year}-${month}-${day}`,
      texto: mensaje
    };
  });
};

// Mejora 8: Más eficiente y segura
const hasCodeContent = (text) => {
  if (!text) return false;
  const keywordCount = codeKeywords.reduce((count, keyword) => 
    text.includes(keyword) ? count + 1 : count, 0);
  return keywordCount > 4;
};

export { 
  processFiles, 
  calculateInteractions, 
  formatDates, 
  hasCodeContent as busqueda 
};
