import React, { useContext } from "react";
// import {GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from "../../context/Authcontext";

const Index = () => {
  const AuthContext = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const logOut = () => {
    AuthContext.logout();
    navigate("/");
  };
  return (
    <div>
      <div className="flex justify-around">
        <h1 className="text-center text-4xl mt-1">Welcome to Dashboard.</h1>
        <button
          onClick={logOut}
          className="py-3 px-5 bg-red-800 border-2 rounded-lg text-white"
        >
          logout
        </button>
      </div>
      
      <div className="flex">
        <div className="w-1/2">
          <h2>Pleade Contact Us!..</h2>
        </div>
        <div className="w-1/2">
          <img src="https://anagaya.com/wp-content/uploads/2020/04/illustration@2x-85cce263ddf60035c6702cc57dd1fc2a-e91d0.jpg" alt="contact-us"/>
        </div>
      </div>

    </div>
  );
};

export default Index;
