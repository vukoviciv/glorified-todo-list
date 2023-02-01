export function extractData(res) {
  return res.data;
}

export function processId(id) {
  const parsedId = Number.parseInt(id);
  if (Number.isNaN(parsedId)) throw new Error('ID is not integer!');

  return parsedId;
}
