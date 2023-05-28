import authService from './auth.service';

const { default: axios } = require('axios');
const { default: tokenService } = require('./token.service');

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    if (process.browser) {
      const accessToken = tokenService.getLocalAcessToken();
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.baseURL = process.browser
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : process.env.SERVER_SIDE_API_BASE_URL;

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!process.browser) return;
    const originalConfig = err.config;

    if (!err.response)
      return Promise.reject({
        statusCode: 500,
        message: 'Something went wrong, please try again later',
      });

    if (/^\/auth.*/.test(originalConfig.url)) return Promise.reject(err.response.data);

    if (err.response.status === 401) {
      try {
        const rs = await authService.refresh();
        const { accessToken } = rs.data;

        tokenService.setLocalAccessToken(accessToken);
        tokenService.setCookieAccessToken(accessToken);

        return api(originalConfig);
      } catch (_err) {
        await authService.signOut();
        Router.push('/landing?clearAuth=true');

        if (_err.message && _err.statusCode) {
          return Promise.reject(_err);
        }

        return Promise.reject({
          statusCode: 500,
          message: 'Something went wrong, please try again later',
        });
      }
    }

    if(err.response.status === 403){
      await authService.signOut();
      Router.push('/landing?clearAuth=true');
    }

    return Promise.reject(err.response.data);
  },
);


export default api;
