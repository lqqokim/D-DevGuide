export default function(context) {
  // Universal keys
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error,
  } = context;

  // Server-side`
  if (process.server) {
    const { req, res, beforeNuxtRender } = context;
    console.info('Server Side Render');
  }

  console.log(process.client);

  // Client-side
  if (process.client) {
    const { from, nuxtState } = context;
    const token = sessionStorage.getItem('KEY');
    console.info('Client Side Render', token);
  }
}
