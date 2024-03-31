import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termAccepted = e.target.terms.checked;

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter");
      return;
    } else if (!termAccepted) {
      setRegisterError("For continue please accept terms and conditions");
      return;
    }
    console.log(email, password);
    // Create USer
    setRegisterError("");
    setRegisterSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setRegisterSuccess("User Created Successfully");
        // Update Profile
        updateProfile(loggedUser, {
          displayName: name,
          photoURL: "",
        })
          .then(() => setRegisterSuccess('Profile Updated'))
          .catch((error) => console.log(error.message));
        // Update Profile
        sendEmailVerification(loggedUser)
          .then(() => {
            setRegisterSuccess("Verification Email Sent");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <h2 className="text-center text-3xl md:py-4">Please Register</h2>
      <form
        onSubmit={handleRegister}
        action=""
        className="space-y-5 flex flex-col items-center justify-center">
        <input
          placeholder="Your name"
          type="text"
          name="name"
          className="input bg-gray-300"
          required
        />
        <br />
        <input
          placeholder="Email"
          type="email"
          name="email"
          className="input bg-gray-300"
          required
        />
        <br />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input bg-gray-300"
            placeholder="Password"
            required
          />
          <span
            className="absolute top-[14px] right-2"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </span>
        </div>
        <br />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">Accept all our terms and condition</label>
        </div>
        <input type="submit" value="Submit" className="btn btn-secondary" />
      </form>
      {registerError && <p className="text-center py-6">{registerError}</p>}
      {registerSuccess && (
        <p className="text-center text-green-600 py-6">{registerSuccess}</p>
      )}
      <p>
        Already Have an Account? <Link to="/login">Please Login</Link>
      </p>
    </div>
  );
};

export default Register;
