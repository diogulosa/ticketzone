import React, {useReducer} from "react";
import { authReducer } from "./reducer";

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export function useAuthState(){
    const context = React.useContext(AuthStateContext)
    if(context === undefined){
        throw new Error("useAuthState must be used within a AuthProvider")
    }
    return context
}

export function useAuthDispatch(){
    const context = React.useContext(AuthDispatchContext)
    if(context === undefined){
        throw new Error("useAuthDispatch must be used within a AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
  
  let initialState = {
    loading: false,
    loggedIn: false,
    userData: {},
    message: ""
  }

  const data = JSON.parse(localStorage.getItem('currentUser')) 
  
  if(data){
    initialState = {
      loading: false,
      loggedIn: true,
      userData: data.user,
      message: ""
    }
  }

  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
  };