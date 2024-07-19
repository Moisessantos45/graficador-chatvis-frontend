import { codeKeywords } from "./dataStatic";

function separarCadena(cadena) {
  const patronFechaHora =
    /(\d{1,2}\/\d{1,2}\/\d{4})\s*(?:,)?\s*(\d{1,2}:\d{2}(?:\s*[ap]\.?\s*m\.?)?)/;
  const match = cadena.match(patronFechaHora);

  if (!match) return null;

  let [, fecha, hora] = match;
  let resto = cadena.slice(match[0].length).trim();

  let nombre, mensaje;
  if (resto.includes(":")) {
    [nombre, mensaje] = resto.split(":", 2);
  } else if (resto.includes("-")) {
    [nombre, mensaje] = resto.split("-", 2);
  } else {
    return null;
  }

  nombre = nombre.trim();
  mensaje = mensaje.trim();

  // Estandarizar el formato de la hora
  hora = hora.toLowerCase().replace(/\./g, "").replace(/\s/g, "");
  if (hora.includes("am")) {
    hora = hora.replace("am", "a.m.");
  } else if (hora.includes("pm")) {
    hora = hora.replace("pm", "p.m.");
  }

  return { fecha, hora, nombre, mensaje };
}

// Función para procesar el contenido de un archivo
function procesarContenido(contenido) {
  // Eliminar saltos de línea múltiples
  contenido = contenido.replace(/\n{2,}/g, "\n");

  const mensajes = [];
  let mensajeActual = "";

  contenido.split("\n").forEach((linea) => {
    if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(linea)) {
      if (mensajeActual) {
        mensajes.push(mensajeActual.trim());
      }
      mensajeActual = linea;
    } else {
      mensajeActual += " " + linea.trim();
    }
  });

  if (mensajeActual) {
    mensajes.push(mensajeActual.trim());
  }

  return mensajes.map(separarCadena).filter((m) => m !== null);
}

const processFiles = async (files) => {
  const resultadosProcesados = [];
  for (const archivo of files) {
    const contenido = await archivo.text();
    const mensajesProcesados = procesarContenido(contenido);
    resultadosProcesados.push({
      path: archivo.name
        .replace("Chat de WhatsApp con ", "")
        .replace(/\.txt$/, ""),
      data: mensajesProcesados,
    });
  }
  return resultadosProcesados;
};

const calculateInteractions = (chatCompleto) => {
  let interacciones = 0;
  return chatCompleto.slice(3).map((mensaje, i) => {
    if (mensaje.mensaje) {
      interacciones++;
    }
    return {
      source: mensaje.nombre,
      value: interacciones,
      target: i < chatCompleto.length - 4 ? chatCompleto[i + 4].nombre : "",
    };
  });
};

const formatDates = (data) => {
  return data.map(({ fecha, mensaje }) => {
    const [day, month, year] = fecha.split("/");
    return {
      fecha: `${year}-${month}-${day}`,
      texto: mensaje,
    };
  });
};

const busqueda = (cadena) => {
  if (cadena == undefined) return false;
  return codeKeywords.filter((item) => cadena.includes(item)).length > 4;
};

export { processFiles, calculateInteractions, formatDates, busqueda };
