import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../redux/user/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      let obj = {
        googleId: user?.uid,
        name: user?.displayName,
        email: user?.email,
      };
      await dispatch(LoginAPI(obj))
        .then((res) => {
          console.log("res", res);
        })
        .catch((error) => {
          console.log("failed", error);
        });
      console.log("User Info:", user);
      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to log in. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Login with Google
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleLogin}
          className="w-full mb-4"
        >
          Sign in with Google
        </Button>
        {/* <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default Login;
