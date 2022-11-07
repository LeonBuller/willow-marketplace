import React from "react";
import { toast } from "react-toastify";

import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, //Changing the value based on the id which is either "email" or "password"
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        //Registering the user using the function above ^ and putting it into the userCredential const
        auth,
        email,
        password
      );
      const user = userCredential.user; // Getting the actual user using the userCredentials

      updateProfile(auth.currentUser, {
        //Updating the display name using the auth.currentUser
        displayName: name,
      });

      const formDataCopy = { ...formData }; // Copying everything that is inside formData and putting it in a const formDataCopy
      delete formDataCopy.password; // Deleting the password
      formDataCopy.timestamp = serverTimestamp(); // Setting the time stamp with the server's

      await setDoc(doc(db, "users", user.uid), formDataCopy); // Updates the db and adds the user to the user collection

      navigate("/"); // Redirecting to the main page
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Full Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="24px" height="24px" />
            </button>
          </div>
        </form>
        {/*Google OAuth*/}

        <Link to="/sign-in" className="registerLink">
          Sign In
        </Link>
      </div>
    </>
  );
}

export default SignUp;
