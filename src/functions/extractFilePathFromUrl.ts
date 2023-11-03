// Función para extraer la ruta del archivo desde la URL de Firebase Storage
export const extractFilePathFromUrl = (url: string): string => {
  const pathStart = url.indexOf('/o/') + 3;
  const pathEnd = url.indexOf('?');
  const filePath = decodeURIComponent(url.substring(pathStart, pathEnd));
  return filePath;
};
