import React, { useContext, useState } from "react";

import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import { AuthenticationContext } from "../../context/Authcontext";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Index.css";

const Index = () => {
  const [mynumber, setnumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setotp] = useState(null);
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState(null);

  const navigate = useNavigate();

  const AuthContext = useContext(AuthenticationContext);

  const generateRecapcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  // Sent OTP
  const signin = () => {
    var auth = getAuth();
    if (mynumber === "" || mynumber.length < 10)
      return toast.error("please enter correct number!");

    generateRecapcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, countryCode + mynumber, appVerifier)
      .then((result) => {
        setfinal(result);
        toast.success("Otp sent!...");
        setshow(true);
      })
      .catch((err) => {
        toast.error("An Error Occure!");
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null)
      return toast.error("please enter the otp!");
    final
      .confirm(otp)
      .then((res) => {
        console.log(res);
        AuthContext.login(res._tokenResponse.refreshToken);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("An Error Occure!");
      });
  };

  const backToLogin = () => {
    navigate("/");
  };

  return (
    <div className="main-img">
      <img
        src="https://static.thenounproject.com/png/2916773-200.png"
        alt="back-logo"
        width="50px"
        height="50px"
        style={{ margin: "1rem 2rem", cursor: "pointer", position: "absolute" }}
        onClick={backToLogin}
      />
      <div className="main_cls">
        <ToastContainer />
        <div className="center">
          <h1>{!show ? "Enter Mobile Number" : "Enter OTP"}</h1>
          {!show ? (
            <div className="phone_number_content">
              <span>
                <div className="number_field">
                  <select
                    name="cars"
                    id="cars"
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="border-2"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+2">+2</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    value={mynumber}
                    onChange={(e) => {
                      setnumber(e.target.value);
                    }}
                    placeholder="phone number"
                    className="border-2 py-2 px-2"
                  />
                </div>
              </span>
              <div id="recaptcha-container"></div>
              <button onClick={signin} className="My_btn">
                Send OTP
              </button>
            </div>
          ) : (
            <div className="phone_number_content">
              <input
                type="text"
                placeholder={"Enter your OTP"}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                style={{ padding: "8px 5px 8px 5px" }}
              ></input>
              <br />
              <br />
              <button onClick={ValidateOtp} className="My_btn">
                Verify
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
