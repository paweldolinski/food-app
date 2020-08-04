export function getFromStorage(key) {
  if (!key) return null;
  try {
    const valueString = localStorage.getItem(key);
    if (valueString) {
      return JSON.parse(valueString);
    }
  } catch (err) {
    return null;
  }
}
export function setInStorage(key, obj) {
  if (!key) console.log("key is missing");
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.log(err);
  }
}
export function deleteFromStorage(key) {
  localStorage.removeItem(key);
}
