import readlineSync from 'readline-sync';

export function getMigrationFileName() {
  const timestamp = new Date().toISOString().replace(/[-T:]|\.\d{3}z$/ig, '');
  const fileName = readlineSync.question('File name: \n>');
  const parsedFileName = fileName.trim().replace(/\s/g, '-');

  return `${timestamp}-${parsedFileName.toLocaleLowerCase()}`;
}
