import React, { useState } from "react";
import "./Index.css"
import {
  getAuth,
  sendPasswordResetEmail
} from "firebase/auth";



const Index = () => {
  const [email, setEmail] = useState("");

  //call on submit button click 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.length !== 0) {
      const auth = getAuth();
    sendPasswordResetEmail(auth,email).then((res) => console.log(res));
    }
    
  }
  return (
    <div className="App">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Forgot Password</h3>
          <div className="form-group mt-3">
            <label style={{ paddingRight: "10px", fontSize: "20px" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Index;
