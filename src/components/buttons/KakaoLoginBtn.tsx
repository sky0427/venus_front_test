import useAuth from "@/hooks/react-query/useAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../shared";
import { Button, toast } from "../ui";

function KakaoLoginBtn() {
  const { kakaoLoginMutation } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      kakaoLoginMutation.mutate(code, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: any) => {
          console.error("카카오 로그인 실패: ", error);
          toast({
            title: "카카오 로그인 실패",
            description: error.message,
          });
        },
      });
    }
  }, [searchParams, kakaoLoginMutation, navigate]);

  return (
    <div className="flex">
      <Button
        onClick={handleKakaoLogin}
        disabled={kakaoLoginMutation.isLoading}
        variant="ghost"
        className="small-medium border -primary-500 p-6">
        {kakaoLoginMutation.isLoading ? (
          <>
            <Loader /> 로그인 중...
          </>
        ) : (
          <>
            <Icon.kakao className="mr-2 h-4 w-4" />
            <p>카카오 로그인</p>
          </>
        )}
      </Button>
    </div>
  );
}

const Icon = {
  kakao: (props: any) => (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </svg>
  ),
};

export default KakaoLoginBtn;
