export const setSessionStorageItem = (name, value) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

export const getSessionStorageItem = (name) => {
  return JSON.parse(sessionStorage.getItem(name));
};

export const removeSessionStorageItem = (name) => {
  sessionStorage.removeItem(name);
};
