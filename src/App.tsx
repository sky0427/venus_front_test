import { Route, Routes, useNavigate } from "react-router-dom";

import SigninForm from "@/_auth/forms/SigninForm";
import SignupForm from "@/_auth/forms/SignupForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "@/_root/pages";
import { Toaster } from "@/components/ui/toaster";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import { useEffect, useState } from "react";
import { Loader } from "./components/shared";
import "./globals.css";
import useAuth from "./hooks/react-query/useAuth";
import { getCookie } from "./hooks/useCookie";
import useAuthStore from "./store/useAuthStore";

interface PrivateRouteProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isLoggedIn,
  isLoading,
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && isLoading) {
      navigate("/sign-in");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return isLoggedIn || isLoading ? <>{children}</> : null;
};

const App = () => {
  const { checkLogin, isLoggedIn, setMember } = useAuthStore();
  const { refreshAccessTokenQuery } = useAuth();
  const { refetch } = refreshAccessTokenQuery;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      checkLogin();

      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (!accessToken && refreshToken) {
        try {
          refetch();
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          navigate("/sign-in");
        }
      }
      setIsLoading(false);
    };
    checkAndRefreshToken();
  }, [checkLogin, refetch, navigate, setMember]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route
          element={
            <PrivateRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
              <RootLayout />
            </PrivateRoute>
          }>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
