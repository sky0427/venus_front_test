import useAuthStore from "@/store/useAuthStore";
import { useCookies } from "react-cookie";

function useAccessToken() {
  const [cookies] = useCookies(["accessToken"]);
  const cookieAccessToken = cookies.accessToken;
  const zustandAccessToken = useAuthStore.getState().accessToken;

  if (cookieAccessToken) {
    return cookieAccessToken;
  } else if (zustandAccessToken) {
    return zustandAccessToken;
  }

  return null; // 또는 undefined, 토큰이 없는 경우
}

export default useAccessToken;
