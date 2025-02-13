import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/react-query/useAuth";
import { SigninValidation } from "@/lib/validation";
import useAuthStore from "@/store/useAuthStore";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // const { login, profile } = useAuthStore();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginMutation } = useAuth();
  const { loginMutate, isLoginLoading, isError, error } = loginMutation;

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    loginMutate(user, {
      onSuccess: (data) => {
        // login(data.accessToken, profile);

        form.reset;

        toast({
          title: "로그인 성공!",
          description: `NEWSNS에 오신걸 환영합니다.`,
        });

        navigate("/");
      },

      onError: (error: any) => {
        console.log("로그인 실패", error);
        toast({
          title: "로그인 실패",
          description: `${error.message}`,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={form.formState.isSubmitting}>
            {isLoginLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>

          {isError && <p>Error: {error?.message} </p>}
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
