import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set, get) => ({
  isAuth: false,
  isInit: false,
  user: {
    id: null,
    email: '',
  },
  _authenticate: () => {
    set({ isAuth: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuth: false });
  },
  login: user => set({ user, isAuth: true }),
  checkAuth: async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response);
      get()._authenticate();
    } catch (e) {
      get().logout();
    } finally {
      set({ isInit: true });
    }
  },
  setIsInit: init => set({ isInit: init }),
}));
