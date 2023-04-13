import { USER_ROLE } from '../constants/user.contant';
import api from './api';
import tokenService from './token.service';
import userService from './user.service';

export class AuthService {
  async refresh() {
    return api.post('/auth/refresh', { refreshToken: tokenService.getLocalRefreshToken() });
  }

  setLocalUser(user) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.setItem('user', user ? JSON.stringify(user) : null);
  }

  getLocalUser() {
    if (typeof window === 'undefined') return null;
    return JSON.parse(window.localStorage.getItem('user'));
  }

  removeLocalUser() {
    if (typeof window === undefined) return null;
    return window.localStorage.removeItem('user');
  }

  async signIn(usernameOrEmail, password) {
    const res = await api.post('/auth/sign-in', { usernameOrEmail, password });
    const { accessToken, refreshToken, user } = await res.data;
    if(![USER_ROLE.ADMIN, USER_ROLE.ROOT].includes(user.role)) return Promise.reject({
      statusCode: 403,
      message: 'Forbidden',
    });
    tokenService.setLocalAccessToken(accessToken);
    tokenService.setLocalRefreshToken(refreshToken);
    this.setLocalUser(user);
    return res;
  }

  async signOut() {
    try{
    const res = await api.delete('/auth/sign-out');
    return res;
    }catch(e){
      return e
    }finally{
      tokenService.removeLocalAccessToken();
      tokenService.removeLocalRefreshToken();
      this.removeLocalUser();
    }
  }
}

export default new AuthService();
