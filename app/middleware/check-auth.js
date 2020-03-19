// 라우터 진입시 호출 (설정은 nuxt.config.js의 미들웨어 참조)
export default ({ req, res, beforeNuxtRender, store }) => {
  // Server-side
  if (process.server) {
    console.info('SERVER-SIDE ');
  }

  if (process.client) {
    // const { from, nuxtState } = context;
    const token = sessionStorage.getItem('KEY');
    console.info('CLIENT-SIDE ', token);
  }

  // context.$axios.interceptors.request.use(
  //   (config) => {
  //     console.log('middleware interceptors.request ', config);
  //     // Do something before request is sent
  //     return config;
  //   },
  //   function(error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );
  //
  //   // let setup = false;
  //   // if (!setup) {
  //   // console.log('라우터 이동시에만 동작');
  //   context.store.app.router.beforeEach((to, from, next) => {
  //     try {
  //       // setup = true;
  //       console.log('middleware beforeEach :: ', to);
  //
  //       if (to.meta.authRequired) {
  //         if (!context.store.state.user.user.loginId) {
  //           context.store
  //             .dispatch('common/alert', {
  //               type: 'warning',
  //               isShow: true,
  //               msg: '로그인이 필요한 페이지입니다.',
  //             })
  //             .then((result) => {
  //               console.log('result :: ', result);
  //               location.href = '/html/Login.html';
  //               // next(false);
  //             });
  //         }
  //       }
  //
  //       // if (to.meta.gitlabTokenRequired) {
  //       //   console.log(context.store.state.user.user.gitlabToken);
  //       //   if (!context.store.state.user.user.gitlabToken) {
  //       //     await context.store
  //       //       .dispatch('common/alert', {
  //       //         type: 'warning',
  //       //         isShow: true,
  //       //         msg: 'Gitlab Token 이 필요한 페이지입니다.',
  //       //       })
  //       //       .then((result) => {
  //       //         console.log('result :: ', result);
  //       //         // location.href = '/html/Login.html';
  //       //         next({
  //       //           path: '/myInfo',
  //       //         });
  //       //       });
  //       //   }
  //       // }
  //
  //       next();
  //       // if (confirm('Are you sure?')) {
  //       //   next();
  //       // } else {
  //       //   next(false);
  //       // }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   });
  //   // }
};

// export default ({ store, route, redirect }) => {
//   console.log('--->');
//   console.log(store);
//   console.log(route);
//   console.log(store.getters['user/getGitLabToken']);
//   if (route.meta[0].gitlabTokenRequired) {
//     console.log('gitlab required');
//     //   console.log(store.getters['user/getGitLabToken']);
//     if (store.getters['user/getGitLabToken'] === '') {
//       console.log('gitlab x');
//       console.log(store.dispatch);
//       store
//         .dispatch('common/alert', {
//           type: 'warning',
//           isShow: true,
//           msg: 'Gitlab Token 이 필요한 페이지입니다.',
//         })
//         .then((result) => {
//           if (result.ok) {
//             console.error('result :: ', result);
//             return redirect('/myInfo');
//           }
//           // location.href = '/html/Login.html';
//           // next({
//           //   path: '/myInfo',
//           // });
//         });
//     }
//   }
// console.log(store.store.app.router.beforeEach);
// console.log(store.store.commit('user/setTokenTest', ''));
// console.log(store.store.getters['user/getGitLabToken']);
// store.store.app.router.beforeEach(async (to, from, next) => {
//   if (to.meta.gitlabTokenRequired) {
//     console.log(store.store.state.user.user.gitlabToken);
//     if (!store.store.state.user.user.gitlabToken) {
//       await store.store
//         .dispatch('common/alert', {
//           type: 'warning',
//           isShow: true,
//           msg: 'Gitlab Token 이 필요한 페이지입니다.',
//         })
//         .then((result) => {
//           console.log('result :: ', result);
//           // location.href = '/html/Login.html';
//           next({
//             path: '/myInfo',
//           });
//         });
//     }
//   }
// });
// console.log(route);
//   console.log(redirect);
// };
