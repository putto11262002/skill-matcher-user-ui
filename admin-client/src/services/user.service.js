import api from './api';

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

  async addUser(payload) {
    return api.post('/admin/user', payload);
  }

  async updateUser({id, payload}){
    return api.put(`/admin/user/${id}`, payload)
  }

  async searchUsers(query) {
    return api.get('/admin/user', { params: query });
  }

  async addSkill({id, payload}){
    return api.post(`/admin/user/${id}/skill`, payload)
  }

  async getUserById(id){
    return api.get(`/admin/user/${id}`)
  }

  async getUserSkills({userId, query}){
    return api.get(`/admin/user/${userId}/skill`, {params: query})
  }

  async updateUserSkill({id, skill, payload}){
    return api.put(`/admin/user/${id}/skill/${skill}`, payload)
  }

  async deleteUserSkill({id, skill}){
    return api.delete(`/admin/user/${id}/skill/${skill}`)
  }

  async updateUserAvatar({id, file}){
    const formData = new FormData()
    formData.append('avatar', file)
    return api.putForm(`/admin/user/${id}/avatar`, formData)
  }

  async deleteUser(id){
    return api.delete(`admin/user/${id}`)
  }
}


export default new UserService();
