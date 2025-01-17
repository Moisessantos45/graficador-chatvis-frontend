const convertToCSV = (array) => {
  if (!Array.isArray(array) || !array.length) {
    throw new Error('Input must be a non-empty array');
  }

  // Use map once instead of multiple Object operations
  const headers = Object.keys(array[0]);
  const csvRows = [
    headers.join(','),
    ...array.map(obj => headers.map(header => 
      // Handle special characters and commas in values
      typeof obj[header] === 'string' && obj[header].includes(',') 
        ? `"${obj[header]}"` 
        : obj[header]
    ).join(','))
  ];

  return csvRows.join('\n');
};

const downloadCSV = (data, filename = 'datos.csv') => {
  try {
    const csv = convertToCSV(data);
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { 
      type: 'text/csv;charset=utf-8'
    });
    
    // Use URL.createObjectURL more efficiently
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    Object.assign(link, {
      href: url,
      download: filename,
      style: 'display: none'
    });

    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
};

export {
  convertToCSV,
  downloadCSV,
};