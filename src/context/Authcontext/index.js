import React,{createContext,useState} from "react";


export const AuthenticationContext  = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});



const AuthenticationContextComponent = (props) => {
  const initialState = sessionStorage.getItem('Auth_Token');
  const [token,setToken] =useState(initialState);

  const isLoggedIn = !!token;

  const loginHandler = (token) => {
   setToken(token);
   sessionStorage.setItem("Auth_Token",token);
  }
  const logoutHandler = () => {
    setToken(null);
    sessionStorage.removeItem("Auth_Token")
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  
  return (
     <AuthenticationContext.Provider value={contextValue}>
       {props.children}
     </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextComponent ;