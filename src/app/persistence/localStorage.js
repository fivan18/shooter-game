export default class LocalStorage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  set value(v) {
    window.localStorage.setItem(this.storageName, JSON.stringify(v));
  }

  get value() {
    let value = null;
    if (window.localStorage.getItem(this.storageName) !== null) {
      value = JSON.parse(window.localStorage.getItem(this.storageName));
    }
    return value;
  }
}