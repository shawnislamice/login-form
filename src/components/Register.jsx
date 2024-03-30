import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter");
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
          placeholder="Email"
          type="email"
          name="email"
          className="input bg-gray-300"
          required
        />
        <br />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className="input bg-gray-300"
          placeholder="Password"
          required
        />
        <span onClick={()=>setShowPassword(!showPassword)}>

          {
            showPassword? <IoMdEyeOff /> : <IoMdEye />
          }
        </span>
        <br />
        <input type="submit" value="Submit" className="btn btn-secondary" />
      </form>
      {registerError && <p className="text-center py-6">{registerError}</p>}
      {registerSuccess && (
        <p className="text-center text-green-600 py-6">{registerSuccess}</p>
      )}
    </div>
  );
};

export default Register;
