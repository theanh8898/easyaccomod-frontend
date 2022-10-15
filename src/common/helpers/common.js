import qs from 'qs';
import {format as dateFormat} from "date-fns";
import {DATE_TIME_FORMAT} from "../constants";

/**
 * Get query params from location.search
 * @param search
 * @param options
 * @return {object}
 */
export const getQueryParams = (search = undefined, options = {}) => {
  if (search === undefined) {
    search = document.location.search;
  }
  return qs.parse(search, {ignoreQueryPrefix: true, ...options});
};

/**
 * Buid query string
 * @param params
 * @param options
 * @return {string|*}
 */
export const buildQueryString = (params, options = {}) => {
  return qs.stringify(params, {options: true, ...options});
};

/**
 * Build a form element with some data
 * @param method
 * @param action
 * @param params
 * @returns {HTMLFormElement}
 */
export const buildForm = (method, action, params = {}) => {
  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', action);
  const keys = Object.keys(params);
  keys.forEach(key => {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', params[key]);
    form.appendChild(input);
  });
  return form;
};

export function getFileExtension(strFilename) {
  const fileName = strFilename.toLowerCase();
  const ext = fileName.replace(/^.*\./, '');
  return ext !== fileName ? '.' + ext : fileName;
}

const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export function generateGUID() {
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
}

export const isFunction = (obj) => typeof obj === 'function';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function getApiErrorMessage(error) {
  if (error?.response?.data) {
    const {errors, message} = error.response.data;
    if (errors?.length) {
      const itemsHasMsg = errors.find(item => item.msg);
      if (itemsHasMsg) {
        return itemsHasMsg.msg;
      }
    }
    if (message) {
      return message;
    }
  }
  if (error?.message) {
    return error.message;
  }
  return 'Lỗi không xác định';
}

export function imageUrl(url) {
  if (!url) {
    return '/images/no-image.png';
  }
  return `${process.env.REACT_APP_API_URL}/${url}`;
}

/**
 * Get file extension from file name
 * @param fileName
 * @return {*}
 */
export const getFileExt = (fileName) => {
  const arr = `${fileName}`.split('.');
  let ext = arr.pop();
  if (!ext) {
    return null;
  }
  return ext.toLowerCase();
};

/**
 * Transfer rooms
 */
export const transferRooms = (rooms) => {
  if (!rooms) {
    return rooms;
  }
  let arr = Array.isArray(rooms) ? [...rooms] : [rooms];
  arr = arr.map(room => {
    const r = {...room, full_address: ''};
    const address = [];
    if (r.address) {
      address.push(r.address);
    }
    if (r.ward) {
      address.push(r.ward.name);
    }
    if (r.district) {
      address.push(r.district.name);
    }
    if (r.province) {
      address.push(r.province.name);
    }
    r.full_address = address.join(', ');
    return r;
  });
  if (!Array.isArray(rooms)) {
    return arr[0];
  }
  return arr;
};

export const numberAsCurrency = (num) => {
  if (num === undefined || num === null || !num.toLocaleString) {
    return 'Liên hệ';
  }
  return `${num.toLocaleString()} đ`;
};

export function formatDateTime(time, format = DATE_TIME_FORMAT) {
  return dateFormat(new Date(time), format)
}
