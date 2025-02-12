import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function KakaoCallback() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (accessToken) {
      setCookie("accessToken", accessToken, { path: "/" });
      setCookie("refreshToken", refreshToken, { path: "/" });
      navigate("/");
    } else {
      console.log("Access Token not found in URL");
      navigate("/login"); // Or handle error
    }
  }, [location, navigate, setCookie]);

  return (
    <div>
      <h1>Kakao Login Callback</h1>
      <p>Checking login status...</p>
    </div>
  );
}

export default KakaoCallback;
