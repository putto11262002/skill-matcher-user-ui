import api from "./api";

export class UserService {
  // setLocalUser(user) {
  //   if (typeof window === 'undefined') return null;
  //   return window.localStorage.setItem('user', user ? JSON.stringify(user) : null);
  // }

  // getLocalUser() {
  //   if (typeof window === 'undefined') return null;
  //   return JSON.parse(window.localStorage.getItem('user'));
  // }

  // removeLocalUser() {
  //   if (typeof window === undefined) return null;
  //   return window.localStorage.removeItem('user');
  // }

  async addUser(payload){
    return api.post("admin/user", payload)
  }
}

export default new UserService();
