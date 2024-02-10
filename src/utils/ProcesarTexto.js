const procesarTexto = (text) => {
  const chatCompleto = [];
  const parts = text.split(/\d{1,2}\/\d{1,2}\/\d{4}(?:,)?/);

  if (!/\d{1,2}:\d{2}\s*[ap]\.?\s*m\./.test(parts[10].trim()) || !parts) {
    return null;
  }

  parts.forEach((text) => {
    if (text && text.trim() !== "" && !text.includes("<Multimedia omitido>")) {
      const [fechaHora, resto] = text.split(" - ");
      let fecha, hora;
      if (fechaHora.includes(",")) {
        [fecha, hora] = fechaHora.split(",");
      } else {
        fecha = fechaHora.split(" ")[0];
        // hora = fechaHora.split(" ")[1] + " " + fechaHora.split(" ")[2];
        hora = fechaHora.split(" ")[1];
      }
      const [nombre, texto] = resto.split(":");
      if (texto) {
        const palabras = texto.trim().split(/\s+/);
        if (palabras.length > 3) {
          chatCompleto.push({
            fecha,
            hora,
            nombre,
            texto,
          });
        }
      }
    }
  });

  return chatCompleto;
};

export default procesarTexto;

const obtener_fecha_hora = (datos) => {
  const chatTiempo = [];
  const lineas = datos.split("\n");

  lineas.forEach((linea) => {
    const partes = linea.split(" - ");
    if (partes.length === 2) {
      const [fechaHora, mensaje] = partes;
      let fecha, hora;
      if (fechaHora.includes(",")) {
        [fecha, hora] = fechaHora.split(", ");
      } else {
        fecha = fechaHora.split(" ")[0];
        hora = fechaHora.split(" ")[1] + " " + fechaHora.split(" ")[2];
      }
      chatTiempo.push({ fecha, hora });
    }
  });

  return chatTiempo;
};

const separarCadena = (cadena) => {
  // console.log(cadena)
  const regex1 =
    /^(\d{1,2}\/\d{1,2}\/\d{4}) (\d{1,2}:\d{2} [ap]\.?\s?m\.) - ([^:]+): (.+)$/;
  const regex2 =
    /^(\d{1,2}\/\d{1,2}\/\d{4},) (\d{1,2}:\d{2} [ap]\.?\s?m\.) - ([^:]+): (.+)$/;
  const chatCompleto = [];
  cadena.split(/\d{1,2}\/\d{1,2}\/\d{4}/).forEach((text) => {
    // console.log(text);
    if (text && text.trim() !== "") {
      let match = text.match(regex1);
      if (!match) {
        match = text.match(regex2);
      }
      if (match) {
        chatCompleto.push({
          fecha: match[1],
          hora: match[2],
          nombre: match[3],
          texto: match[4],
        });
      }
    }
  });

  return chatCompleto;
};

const simplificarObjeto = (chatCompleto) => {
  let interacciones = 0;
  return chatCompleto.slice(3).map((mensaje, i) => {
    if (mensaje.texto) {
      interacciones++;
    }
    return {
      source: mensaje.nombre,
      value: interacciones,
      target: i < chatCompleto.length - 4 ? chatCompleto[i + 4].nombre : "",
    };
  });
};

const palabrasYCaracteres = [
  "while",
  "for",
  "let",
  "int",
  "const",
  "function",
  "def",
  "(",
  ")",
  "{",
  "}",
  "<",
  ">",
  "+",
  "-",
  "/",
  "[",
  "]",
  "if",
  "else",
  "switch",
  "case",
  "return",
  "class",
  "public",
  "private",
  "protected",
  "static",
  "void",
  "try",
  "catch",
  "throw",
  "import",
  "from",
  "export",
  "module",
  "==",
  "!=",
  "===",
  "!==",
  "<=",
  ">=",
  "//",
  "/*",
  "* /",
  "#",
  '" "',
  "float",
  "*",
  "scanf",
  "%f",
  "&",
];

const busqueda = (cadena) => {
  // console.log(cadena)
  if (cadena == undefined) return false;
  return palabrasYCaracteres.filter((item) => cadena.includes(item)).length > 4;
};

export { separarCadena, obtener_fecha_hora, simplificarObjeto, busqueda };
