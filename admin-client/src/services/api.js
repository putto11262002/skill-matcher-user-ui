import authService from './auth.service';

const { default: axios } = require('axios');
const { default: tokenService } = require('./token.service');

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = tokenService.getLocalAcessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
    
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        originalConfig.url !== '/auth/sign-in' &&
        originalConfig.url !== '/auth/sign-out'
      ) {
        originalConfig._retry = true;
        
        try {
          const rs = await authService.refresh();
          const { accessToken } = rs.data;
          tokenService.setLocalAccessToken(accessToken);
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          return api(originalConfig);
        } catch (_err) {
          await  authService.signOut()
          if (_err.message && _err.statusCode) {
            return Promise.reject(_err);
          }

          return Promise.reject({
            statusCode: 500,
            message: 'Something went wrong, please try again later',
          });
        }
      }

      // if (err.response.status === 403 && err.response.data) {
      //   return Promise.reject(err.response.data);
      // }
    }

    if (err.response && err.response.data) {
      return Promise.reject(err.response.data);
    }

    return Promise.reject({
      statusCode: 500,
      message: 'Something went wrong, please try again later',
    });
  },
);

export default api;
