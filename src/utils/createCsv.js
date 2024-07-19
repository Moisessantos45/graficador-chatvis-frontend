const convertToCSV = (array) => {
  const header = Object.keys(array[0]).join(",") + "\n";
  const rows = array.map((obj) => Object.values(obj).join(",")).join("\n");
  return header + rows;
};

const downloadCSV = (data) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "datos.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export {
    convertToCSV,
    downloadCSV,
}