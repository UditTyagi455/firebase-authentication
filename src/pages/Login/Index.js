import React, {  useState, useContext } from "react";
import "./Index.css";
import { AuthenticationContext } from "../../context/Authcontext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {BiHide,BiShow} from "react-icons/bi"

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider
} from "firebase/auth";

import Loader from "../../shared/Loader";
import app from "../../auth/firebase-auth";

export default function Index() {
  // const { signIn, loaded } = useGoogleLogin()

  const MyAuthData = useContext(AuthenticationContext);
  const provider = new GoogleAuthProvider();
  var facebookProvider = new FacebookAuthProvider();
  const githuProvider =new GithubAuthProvider();
  const twitterProvider = new TwitterAuthProvider();



  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow] = useState(false);

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(`Email : ${email} and password : ${password}`);
    const authentication = getAuth();

    //when user signup
    if (id) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          MyAuthData.login(response._tokenResponse.refreshToken);
          navigate("/dashboard");
          // console.log(response);
        })
        .catch((error) => {
          toast.error("An Error Occure!");
        });
    } else {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          MyAuthData.login(response._tokenResponse.refreshToken);
          setLoader(false);
          navigate("/dashboard");
          // console.log(response);
        })
        .catch((error) => {
          setLoader(false);
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          } else {
            toast.error("An Error Occure!");
          }
        });
    }
  };

  const setPasswordValue = (e) => {
    setPassword(e.target.value);
    if(e.target.value === "") setShow(false)
  }

  const googleSignIn = () => {
    
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((response) => {
        MyAuthData.login(response._tokenResponse.refreshToken);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("An Error Occure!");
      });
  };

  const facebookSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((response) => {
        MyAuthData.login(response._tokenResponse.refreshToken);
        navigate("/dashboard");
        // console.log(response);
      })
      .catch((err) => {
        toast.error("An Error Occure!...");
      });
  };

  const githubSignIn = () => {
   const auth = getAuth(app);
   signInWithPopup(auth,githuProvider).then((response) => {
    // console.log(response);
    MyAuthData.login(response._tokenResponse.refreshToken);
    navigate("/dashboard");
   }).catch((err) => {
    // console.log(err);
    toast.error("An Error Occure!...")
   })
  }

  const twitterSignIn = () =>{
  const auth = getAuth();
  signInWithPopup(auth,twitterProvider).then((response) => {
    // console.log("twitter response: ",response);
    MyAuthData.login(response._tokenResponse.refreshToken);
    navigate("/dashboard");
  }).catch((err) => {
    // console.log(err);
    toast.error("An Error Occure!...");
  })
  }


  return (
    <>
      {loader ? <Loader /> : ""}
      <ToastContainer />
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">{id ? "SignUp" : "LogIn"}</h3>
            <div className="input-fields">
              <div className="form-group mt-3">
                <label style={{ fontSize: "22px" }}>Email Address</label>
                <input
                  type="email"
                  className="border-2 py-2 px-2"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label style={{ fontSize: "22px" }}>Password</label>
               
                <input
                  type={show ? "text" : "password"}
                  className="border-2 py-2 px-2"
                  placeholder="Enter password"
                  value={password}
                  onChange={setPasswordValue}
                  autoComplete="true"
                />
                <span className="hide_show" onClick={() => { setShow(!show)}}>{show ? <BiShow style={{fontSize: "1.7rem"}}/> : <BiHide style={{fontSize: "1.7rem"}}/>}</span>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {id ? "Sign up" : "Login"}
              </button>
            </div>
            <div style={{ marginTop: "15px" }}></div>
            <p className="forgot-password text-right mt-2">Forgot password?</p>
            <p className="forgot-password text-right mt-2">
              {id ? "Existing User?" : "New User?"}{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setId(!id)}
              >
                {id ? "login" : "signup"}
              </span>
            </p>
            <p
              style={{
                border: "2px solid black",
                padding: "5px 8px",
                margin: "8px 0px",
                borderRadius: "18px",
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={googleSignIn}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU"
                alt="google-logo"
                width="20px"
                height="20px"
                style={{marginLeft: "-10px", marginRight: "5px" }}
              />
              Sign in with Google{" "}
            </p>
            <p
              style={{
                border: "2px solid black",
                padding: "5px 8px",
                borderRadius: "18px",
                margin: "8px 0px",
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={facebookSignIn}
            >
              <img
                src="https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19750.png"
                alt="facebook-logo"
                width="20px"
                height="20px"
                style={{ marginLeft: "8px",marginRight: "5px" }}
              />
              Sign in with Facebook{" "}
            </p>
            <Link to="phone-verify">
              <p
                style={{
                  border: "2px solid black",
                  padding: "5px 8px",
                  margin: "8px 0px",
                  borderRadius: "18px",
                  alignItems: "center",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSpYyBV84HdeozrEOHhCacE3jt5x0BA0l58Q&usqp=CAU"
                  alt="phone-logo"
                  width="20px"
                  height="20px"
                  style={{ marginLeft: "-20px",marginRight: "5px" }}
                />
                <span style={{ textDecoration: "none" }}>
                  Sign in with Phone{" "}
                </span>{" "}
              </p>
            </Link>
            <p
              style={{
                border: "2px solid black",
                padding: "5px 8px",
                borderRadius: "18px",
                margin: "8px 0px",
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={githubSignIn}
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                alt="facebook-logo"
                width="20px"
                height="20px"
                style={{marginLeft: "-20px", marginRight: "5px" }}
              />
              Sign in with Github{" "}
            </p>
            <p
              style={{
                border: "2px solid black",
                padding: "5px 8px",
                borderRadius: "18px",
                margin: "8px 0px",
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={twitterSignIn}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
                alt="facebook-logo"
                width="20px"
                height="20px"
                style={{marginLeft: "-10px", marginRight: "5px" }}
              />
              Sign in with Twitter
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

// <GoogleLogin
// clientId={clientId}
// buttonText="Sign in with Google"
// onSuccess={onSuccess}
// onFailure={onFailure}
// cookiePolicy={'single_host_origin'}
// isSignedIn={true}
// />
