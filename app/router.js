import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import Index from '@/pages/index.vue';
import Storage from '@/pages/Storage.vue';

Vue.use(Router);

// const apiRootPath = 'http://localhost:3000/api';
// Vue.prototype.$apiRootPath = apiRootPath;
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = apiRootPath;

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index,
      },
      {
        name: 'storage',
        path: '/storage',
        component: Storage,
      },
    ],
  });
}
