import api from './api';
import tokenService from './token.service';
import userService from './user.service';

export class AuthService {
  async refresh() {
    return api.post('/auth/refresh', { refreshToken: tokenService.getLocalRefreshToken() });
  }

  async signIn(usernameOrEmail, password) {
    const res = await api.post('/auth/sign-in', { usernameOrEmail, password });
    const { accessToken, refreshToken, user } = await res.data;
    tokenService.setLocalAccessToken(accessToken);
    tokenService.setLocalRefreshToken(refreshToken);
    userService.setLocalUser(user);
    return res;
  }

  async signOut() {
    const res = await api.delete('/auth/sign-out');
    tokenService.removeLocalAccessToken();
    tokenService.removeLocalRefreshToken();
    userService.removeLocalUser();
    return res;
  }
}

export default new AuthService();
