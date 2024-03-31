import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginerror, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLoginError("");
    setLoginSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (loggedUser.emailVerified) {
          setLoginSuccess("User Logged In Successfully");
        }else{
            setLoginError("Please Verify Your Email");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  const handlePasswordReset = (e) => {
    const email = emailRef.current.value;
    if (!email) {
      setLoginError("Please enter your email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoginError("Please enter a valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoginSuccess("Password Reset Email Sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="max-w-md container mx-auto my-6 ">
      <form
        onSubmit={handleLogin}
        action="
      "
        className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="email"
            className="grow"
            placeholder="Email"
            required
            ref={emailRef}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" name="password" required className="grow" />
        </label>
        <label className="label">
          <p className="cursor-pointer " onClick={handlePasswordReset}>
            Forgot Password
          </p>
        </label>
        <input
          type="submit"
          value="Login Now"
          className="btn btn-secondary block mx-auto"
        />
      </form>
      {loginerror && <p className="text-center py-6">{loginerror}</p>}
      {loginSuccess && (
        <p className="text-center text-green-600 py-6">{loginSuccess}</p>
      )}
      <p>
        New Here please <Link to="/register">register</Link>
      </p>
    </div>
  );
};

export default Login;
