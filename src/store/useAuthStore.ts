import { getCookie, removeCookie } from "@/hooks/useCookie";
import { Member } from "@/types";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  member: Member | null;
  login: (member: Member) => void;
  checkLogin: () => void;
  logout: () => void;
  setMember: (member: Member | null) => void;
}

const useAuthStore = create<AuthState>()((set) => {
  return {
    isLoggedIn: false,
    member: null,
    login: (member) => {
      set({ isLoggedIn: true, member: member });
    },
    checkLogin: () => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (accessToken && refreshToken) {
        set({ isLoggedIn: true });
      } else {
        set({ member: null, isLoggedIn: false });
      }
    },
    logout: () => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      set({ isLoggedIn: false, member: null });
    },
    setMember: (member) => set({ member }),
  };
});

export default useAuthStore;
