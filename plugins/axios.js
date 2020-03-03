import Vue from 'vue';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {},
  // timeout: 1000
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    console.info('interceptors.request :: ', config);
    // config.headers.genericKey = 'someGenericValue';
    return config;
  },
  (error) => {
    console.error('request err :: ', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    /** In dev, intercepts request and logs it into console for dev */
    console.info('interceptors.response :: ', response);
    return response;
  },
  (error) => {
    console.error('response err :: ', error);
    return Promise.reject(error);
  }
);

Vue.use(axios);
