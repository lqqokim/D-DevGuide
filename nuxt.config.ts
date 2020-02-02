import events from 'events';
import { Configuration } from '@nuxt/types';
import Stylelint from 'stylelint-webpack-plugin';
require('dotenv').config();
events.EventEmitter.defaultMaxListeners = 50;
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

console.log('process.env.BASE_URL :: ', process.env.BASE_URL);

const DBS_PROXY = process.env.DBS_URL
  ? [
      `${process.env.DBS_URL}/html`,
      `${process.env.DBS_URL}/css`,
      `${process.env.DBS_URL}/images`,
      `${process.env.DBS_URL}/**.jsp`,
      `${process.env.DBS_URL}/scripts`,
      `${process.env.DBS_URL}/jqGrid`,
      `${process.env.DBS_URL}/Highcharts-5.0.14`,
      `${process.env.DBS_URL}/jqUI`,
      `${process.env.DBS_URL}/sweetalert`,
      `${process.env.DBS_URL}/GPW`,
    ]
  : [];

const config: Configuration = {
  mode: 'universal',
  srcDir: 'app/',
  server: {
    host: '0.0.0.0',
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js',
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  router: {
    middleware: 'check-auth',
  },
  /*
   ** Headers of the page
   */

  // @ts-ignore
  head: {
    title: process.env.npm_package_name || 'D-Business School',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],
  // rules: [
  //   {
  //     test: /\.css$/,
  //     use: ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use: 'css-loader',
  //     }),
  //   },
  // ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '../plugins/vue-js-modal',
    // { src: '../.nuxt/tui/editor.client.js', ssr: false, mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/router',
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    '@tui-nuxt/editor',
    'cookie-universal-nuxt',
  ],
  // styleResources: {
  //   scss: ['./assets/scss/*.scss'],
  // },
  axios: {
    // baseURL: process.env.BASE_URL || 'http://localhost:3000',
    proxy: true,
  },
  proxy: DBS_PROXY,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //     },
    //   },
    // },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // @ts-ignore
        config.plugins.push(
          new Stylelint({
            files: '**/*.{css,scss,vue}',
          })
        );
      }
    },
  },
};

export default config;
