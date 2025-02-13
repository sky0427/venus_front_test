import { Link } from "react-router-dom";

import useAuth from "@/hooks/react-query/useAuth";

import { Button } from "../ui/button";

const Topbar = () => {
  const { logoutMutation } = useAuth();

  const handleSignOut = () => {
    logoutMutation;
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={handleSignOut}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/`} className="flex-center gap-3">
            <img
              src={"/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
