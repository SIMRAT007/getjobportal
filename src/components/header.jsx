// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { setGuestMode, clearGuestMode } from "@/utils/guestUtils";
import Logo from "../assets/logo.png";
import { LogIn } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  // const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sign-in")) {
      setShowSignIn(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      clearGuestMode(); 
    }
  }, [user]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      // setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 mt-2 flex justify-between items-center mb-5 md:px-8 md:rounded-full md:mt-5 md:border md:border-2 md:border-dashed md:border-gray-500 md:shadow-2xl md:backdrop-blur container max-lg:w-[95%] max-2xl:w-[95%] ">
        <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }}>
          {/* <p className="md:text-4xl text-2xl italic text-gray-600">Destiny Jobs</p> */}
          <img
            src={Logo}
            alt="Destiny Jobs Logo"
            className="w-[80%] md:w-44 h-auto"
          />
        </a>

        <div className="flex gap-8">
          <div className="hidden md:flex gap-8 mt-2">
            <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="text-lg font-medium text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="/terms-conditions" onClick={(e) => { e.preventDefault(); window.location.href = "/terms-conditions"; }} className="text-lg font-medium text-gray-600 hover:text-gray-800">
              Terms & Conditions
            </a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); window.location.href = "/contact"; }} className="text-lg font-medium text-gray-600 hover:text-gray-800">
              Contact
            </a>
          </div>

          <SignedOut>
            <Button
              variant="outline"
              className="group text-gray-200 border-[#173a96] bg-[#173a96] hover:bg-gray-100 rounded-full md:px-6 flex items-center gap-2 hover:text-[#173a96]"
              onClick={() => setShowSignIn(true)}
            >
              <LogIn
                size={20}
                className="text-white group-hover:text-[#173a96] transition-colors"
              /> 
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <>
               <Button
                variant="destructive"
                className="rounded-full bg-red-500 text-white hover:bg-red-600"
                onClick={() => window.location.href = "/post-job"}
              >
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
              </>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4"
          >
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
            <p className="text-gray-500 text-sm">or</p>
            <Button
              variant="outline"
              className="rounded-full text-gray-700 border-gray-300"
              onClick={() => {
                setGuestMode();
                setShowSignIn(false);
                window.location.href = "/jobs";
              }}
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      )}

       {/* Add an <hr> line here */}
    <hr className="border-t-2 border-gray-400 my-4 md:hidden -mt-2 " />
    </>
  );
};

export default Header;
