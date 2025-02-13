import useAuth from "@/hooks/react-query/useAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../shared";
import { Button } from "../ui";

function NaverLoginBtn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { naverLoginMutation } = useAuth();

  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = import.meta.env.NAVER_CLIENT_ID;
    const NAVER_REDIRECT_URI = import.meta.env.NAVER_REDIRECT_URI;
    const NAVER_STATE = Math.random;
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      naverLoginMutation.mutate({ code, state } as any, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: any) => {
          console.error("Naver Login Error:", error);
          navigate("/login?error=naver_login_failed");
        },
      });
    }
  }, [searchParams, naverLoginMutation, navigate]);

  return (
    <div className="flex">
      <Button
        onClick={handleNaverLogin}
        disabled={naverLoginMutation.isLoading}
        variant="ghost"
        className="small-medium border border-primary-500 p-6">
        {naverLoginMutation.isLoading ? (
          <>
            <Loader /> 로그인 중...
          </>
        ) : (
          <>
            <Icon.naver className="mr-2 h-4 w-4" />
            <p>네이버 로그인</p>
          </>
        )}
      </Button>
    </div>
  );
}

const Icon = {
  naver: (props: any) => (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13h-2V7h2v8zm5 0h-2V7h2v8z" />
    </svg>
  ),
};

export default NaverLoginBtn;
