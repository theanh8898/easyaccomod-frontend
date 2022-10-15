import Axios from 'axios';
import store from '../redux/store';
import {logoutAC} from '../redux/actions';
import {getValueFromStorage, storeValueToStorage} from '../common/helpers';
import {STORAGE_KEYS} from '../common/constants';
import {refreshTokenAPI} from './tokens';

class APIError extends Error {
  response = null;

  constructor(response) {
    super(response?.data?.metadata?.message || '');
    this.response = response;
  }
}

function createRequester() {
  const axios = Axios.create();

  const defaultConfig = {
    __auth: true,
  };

  const setHeader = (config, key, value) => {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[key] = value;
  };

  const onRequest = (config) => {
    config = {...defaultConfig, ...config};
    if (config.__auth && !config?.headers?.Authorization) {
      const tokens = getValueFromStorage(STORAGE_KEYS.Tokens);
      if (tokens?.access_token) {
        setHeader(config, 'Authorization', `Bearer ${tokens.access_token}`);
      }
    }
    if (`${config.method}`.toLowerCase() === 'get' && !config?.params?.t) {
      if (!config.params) {
        config.params = {};
      }
      config.params.t = new Date().getTime();
    }
    return config;
  };

  const onRequestError = (error) => {
    return Promise.reject(error);
  };

  const onResponse = (response) => {
    if (response?.data?.code !== 200) {
      return Promise.reject(new APIError(response));
    }
    return response;
  };

  const onResponseError = (error) => {
    if (error?.response) {
      const {status} = error.response;
      if (status === 401) {
        return handleError401(error);
      }
    }
    return Promise.reject(error);
  };

  let refresh_tokenRequest = null;

  const handleError401 = async (error) => {
    if (error.config.params?.retryCount) {
      if (error.config.params.retryCount >= 1) {
        return handleRefreshError();
      }
    }
    refresh_tokenRequest = refresh_tokenRequest ? refresh_tokenRequest : handleRefreshToken();
    const tokens = await refresh_tokenRequest;
    setHeader(error.config, 'Authorization', `Bearer ${tokens?.access_token}`);
    if (!error.config.params) {
      error.config.params = {};
    }
    if (!error.config.params?.retryCount) {
      error.config.params.retryCount = 1;
    } else {
      error.config.params.retryCount += 1;
    }
    await new Promise(resolve => {
      setTimeout(resolve, 300);
    });
    return axios.request(error.config);
  };

  const handleRefreshToken = async () => {
    try {
      const tokens = await getValueFromStorage(STORAGE_KEYS.Tokens);
      if (!tokens?.refresh_token) {
        return handleRefreshError(new Error('No token found'));
      }
      const {refresh_token} = tokens;
      const res = await refreshTokenAPI(refresh_token);
      if (res?.data) {
        const newTokens = res.data;
        storeValueToStorage(STORAGE_KEYS.Tokens, {
          ...tokens,
          ...newTokens,
        });
        refresh_tokenRequest = null;
        return newTokens;
      } else {
        refresh_tokenRequest = null;
        return handleRefreshError(new Error('Invalid response'));
      }
    } catch (e) {
      refresh_tokenRequest = null;
      return handleRefreshError(e);
    }
  };

  const handleRefreshError = (error) => {
    store.dispatch(logoutAC(true));
    if (error) {
      throw error;
    }
    throw new Error('Session expired');
  };

  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(onResponse, onResponseError);

  return axios;
}

export default createRequester;
