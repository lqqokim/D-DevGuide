// 라우터 진입시 호출 (설정은 nuxt.config.js의 미들웨어 참조)

export default (context) => {
  context.store.dispatch('user/initAuth', context);
};
