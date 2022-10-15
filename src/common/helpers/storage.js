export function storeValueToStorage(key, value, driver = 'local') {
  if (!key || (driver !== 'local' && driver !== 'session')) {
    return;
  }
  const saveValue = typeof value === 'object' ? JSON.stringify(value) : value;
  const storageDriver = driver === 'local' ? localStorage : sessionStorage;
  try {
    storageDriver.setItem(key, saveValue);
  } catch (e) {
    console.error(e);
  }
}

export function getValueFromStorage(key, defaultValue = null, driver = 'local') {
  if (!key || (driver !== 'local' && driver !== 'session')) {
    return;
  }
  const storageDriver = driver === 'local' ? localStorage : sessionStorage;
  try {
    let value = storageDriver.getItem(key);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (e) {

      }
    }
    return value ?? defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
}

export function removeValueFromStorage(key, driver = 'local') {
  if (!key || (driver !== 'local' && driver !== 'session')) {
    return;
  }
  const storageDriver = driver === 'local' ? localStorage : sessionStorage;
  try {
    storageDriver.removeItem(key);
  } catch (e) {
    console.error(e);
  }
}
