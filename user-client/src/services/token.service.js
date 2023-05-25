import { setCookie } from "cookies-next";

export class TokenService {
  getLocalAcessToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem('accessToken');
  }

  getLocalRefreshToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem('refreshToken');
  }

  setLocalRefreshToken(refreshToken) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.setItem('refreshToken', refreshToken);
  }

  setLocalAccessToken(accessToken) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.setItem('accessToken', accessToken);
  }

  removeLocalAccessToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.removeItem('accessToken');
  }

  removeLocalRefreshToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.removeItem('refreshToken');
  }

  setCookieAccessToken(token){
    setCookie('accessToken', token)
  }

  setCookieRefreshToken(token){
    setCookie('refreshToken', token)
  }
}

export default new TokenService();
