import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string, profile?: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
    isLoggedIn: false,
    accessToken: null,
    profile: null,
    login: (token) =>
      set({
        isLoggedIn: true,
        accessToken: token,
      }),
    logout: () =>
      set({
        isLoggedIn: false,
        accessToken: null,
      }),
  })
);

export default useAuthStore;
