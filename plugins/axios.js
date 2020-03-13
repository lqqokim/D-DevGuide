export default ({ $axios, store }) => {
  // $axios.defaults.baseURL = process.env.BASE_URL;

  // if (process.server) {
  //   return;
  // }

  // Add a request interceptor
  $axios.interceptors.request.use(
    (config) => {
      console.info('interceptors.request :: ', config);
      config.headers.genericKey = 'someGenericValue';
      return config;
    },
    (error) => {
      console.error('request err :: ', error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  $axios.interceptors.response.use(
    (response) => {
      /** In dev, intercepts request and logs it into console for dev */
      // console.info('interceptors.response :: ', response);
      return response;
    },
    (error) => {
      console.error('response err :: ', error.response, error.status);
      store.dispatch('common/alert', {
        type: 'error',
        isShow: true,
        msg: `[${error.response.status}] ` + error.response.data.msg,
      });

      return Promise.reject(error);
    }
  );
};
