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

export function getToken() {
  const getObj = JSON.parse(localStorage.getItem("theMainApp"));
  if (getObj) {
    const { token } = getObj;
    return token;
  }
  return;
}

export function getRecipesFromLS() {
  const getObj = JSON.parse(localStorage.getItem("list"));
  if (getObj) return getObj;
  return;
}
