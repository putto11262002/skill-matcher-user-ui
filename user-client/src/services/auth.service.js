import api from './api';
import tokenService from './token.service';

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
    tokenService.setLocalAccessToken(accessToken);
    tokenService.setLocalRefreshToken(refreshToken);
    this.setLocalUser(user);
    return res;
  }

  async signUp(name, email, password) {
    const res = await api.post('/auth/sign-up', { name, email, password });
    const { accessToken, refreshToken, user } = await res.data;
    tokenService.setLocalAccessToken(accessToken);
    tokenService.setLocalRefreshToken(refreshToken);
    this.setLocalUser(user);
    return res;
  }

  async signOut() {
    tokenService.removeLocalAccessToken();
    tokenService.removeLocalRefreshToken();
    this.removeLocalUser();
    const res = await api.delete('/auth/sign-out');
    return res;
  }


}

export default new AuthService();
