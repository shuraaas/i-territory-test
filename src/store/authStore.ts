import { create } from 'zustand';
import axios from 'axios';

interface AuthStoreState {
  isAuth: boolean;
  isInit: boolean;
  user: {
    id: number | null;
    email: string;
  };
  _authenticate: () => void;
  logout: () => void;
  login: (user: { id: number | null; email: string }) => void;
  checkAuth: () => void;
  setIsInit: (init: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
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
      await axios.get('http://localhost:3000/posts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      get()._authenticate();
    } catch (e) {
      get().logout();
    } finally {
      set({ isInit: true });
    }
  },
  setIsInit: init => set({ isInit: init }),
}));
