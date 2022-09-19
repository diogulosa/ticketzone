import React, {useReducer} from "react";
import { eventReducer } from "./reducer";

const EventStateContext = React.createContext()
const EventDispatchContext = React.createContext()

export function useEventState(){
    const context = React.useContext(EventStateContext)
    if(context === undefined){
        throw new Error("useEventState must be used within a EventProvider")
    }
    return context
}

export function useEventDispatch(){
    const context = React.useContext(EventDispatchContext)
    if(context === undefined){
        throw new Error("useEventDispatch must be used within a EventProvider")
    }
    return context
}

export const EventProvider = ({ children }) => {
  
    let initialState = {
      loading: false,
      eventData: {},
      message: ""
    }

    const data = JSON.parse(localStorage.getItem('currentEvent')) 
  
  if(data){
    initialState = {
      loading: false,
      userData: data.event,
      message: ""
    }
  }
  
    const [state, dispatch] = useReducer(eventReducer, initialState);
    
    return (
      <EventStateContext.Provider value={state}>
        <EventDispatchContext.Provider value={dispatch}>
          {children}
        </EventDispatchContext.Provider>
      </EventStateContext.Provider>
    );
    };