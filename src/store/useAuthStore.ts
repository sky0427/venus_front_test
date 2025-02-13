import { Profile } from "@/types";
import { Cookies } from "react-cookie";
import { create } from "zustand";

const cookies = new Cookies();

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  profile: Profile | null;
  login: (accessToken: string, profile: Profile) => void;
  logout: () => void;
  setProfile: (profile: Profile) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  accessToken: null,
  profile: null,
  login: (accessToken, profile) => {
    set({ isLoggedIn: true, accessToken, profile });
    cookies.set("accessToken", accessToken, { path: "/" });
  },
  logout: () => {
    cookies.remove("accessToken");
    set({ isLoggedIn: false, accessToken: null, profile: null });
  },
  setProfile: (profile: Profile) => set({ profile }),
}));

export default useAuthStore;
