import { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
} from "victory";

const GraficaDatos = ({ objeto, dias }) => {
  const [datosDia, setDatosDia] = useState([]);
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

  const datos_grafica = Array.from(objeto).map((item, index) => {
    if (dias[index]) {
      return {
        fecha: item.fecha,
        texto: dias[index].texto,
      };
    }
  });

  const ordenarDatos = (data) => {
    // console.log(data)
    const fechasEncontradas = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!item) continue;
      const fecha = item.fecha ? item.fecha : "";

      let fechaEncontrada = fechasEncontradas.find(
        (element) => element[0].fecha === fecha
      );

      if (!fechaEncontrada) {
        fechaEncontrada = [item];
        fechasEncontradas.push(fechaEncontrada);
      }

      if (fechaEncontrada.length < 99) {
        fechaEncontrada.push(item);
      }
    }

    return fechasEncontradas;
  };

  let fechas = ordenarDatos(datos_grafica);

  useEffect(() => {
    function contieneCodigo(mensaje) {
      let conteo = 0;

      for (const keywordOrChar of palabrasYCaracteres) {
        if (mensaje.includes(keywordOrChar) && mensaje !== undefined) {
          return 1;
        }
      }

      return conteo;
    }
    if (fechas && fechas.length > 0) {
      const datos_dias_contados = fechas.map((fechaItems) => {
        const data = fechaItems.flat();
        const code = data.reduce((totalCode, item) => {
          if (item.texto) {
            const textoSinSaltosDeLinea = item.texto.replace(/\n/g, " ");
            return totalCode + contieneCodigo(textoSinSaltosDeLinea);
          }
          return totalCode;
        }, 0);

        const normal = data.reduce((totalNormal, item) => {
          return (
            totalNormal +
            (item.texto
              ? item.texto.trim().length -
                contieneCodigo(item.texto.replace(/\n/g, " "))
              : 0)
          );
        }, 0);
        const fecha = fechaItems[0].fecha;
        const valor = fechaItems.length;
        return {
          fecha,
          valor,
          normal,
          code,
        };
      });

      setDatosDia(datos_dias_contados);
    }
  }, []);

  const myDataset = [[], []];

  datosDia.forEach((data) => {
    myDataset[0].push({ x: data.fecha, y: data.code });
    myDataset[1].push({ x: data.fecha, y: data.normal });
  });

  const transformData = (dataset) => {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y;
      }, 0);
    });
    return dataset.map((data) => {
      return data.map((datum, i) => {
        return { x: datum.x, y: (datum.y / totals[i]) * 100 };
      });
    });
  };

  const dataset = transformData(myDataset);
  // console.log(dataset);
  return (
    <article className="w-11/12 sm:w-1/2 heigth_data flex items-center justify-center flex-col shadow-xl rounded-lg shadow-gray-300 hover:scale-100 transition-al">
      {/* <VictoryChart height={450} width={650} domainPadding={{ x: 30, y: 20 }}>
        <VictoryStack colorScale={["blue", "tomato"]}>
          {dataset.map((data, i) => {
            return (
              <VictoryBar
                data={data}
                key={i}
                labels={({ datum }) =>
                  datum.y.toFixed(datum.y % 1 !== 0 ? 2 : 0)
                }
                labelComponent={<VictoryLabel dy={-20} />}
              />
            );
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
        <VictoryAxis
          tickValues={dataset[0].map((data) => data.x)}
          tickFormat={(tick) => `${tick}`} 
        />
      </VictoryChart> */}
      <VictoryChart
        height={790}
        width={1230}
        domainPadding={{ x: 30, y: 20 }}
        style={{ overflowX: "auto" }}
      >
        <VictoryStack colorScale={["blue", "tomato"]}>
          {dataset.map((data, i) => {
            return (
              <VictoryBar
                data={data}
                key={i}
                labels={({ datum }) => `${datum.y.toFixed(2)}%`}
                labelComponent={<VictoryLabel dy={-20} />}
              />
            );
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
        <VictoryAxis
          tickValues={dataset[0].map((data) => data.x)}
          tickFormat={(tick) => `${tick}`}
        />
        <VictoryLegend
          x={30}
          y={10}
          orientation="horizontal"
          data={[
            { name: "Codigo", symbol: { fill: "blue" } },
            { name: "Mensajes", symbol: { fill: "tomato" } },
          ]}
          style={{
            labels: { fontSize: 15 },
          }}
        />
      </VictoryChart>
    </article>
  );
};

export default GraficaDatos;
