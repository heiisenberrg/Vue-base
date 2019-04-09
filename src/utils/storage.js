const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const setItems = (storageObjects) => {
  storageObjects.forEach((storageObject) => {
    this.setItem(storageObject.key, storageObject.value);
  });
};

const getItem = key => localStorage.getItem(key);
const deleteItem = (key) => { localStorage.removeItem(key); };

export default {
  setItem,
  setItems,
  getItem,
  deleteItem
};

