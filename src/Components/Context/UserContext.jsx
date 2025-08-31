import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

 export  const UserContext = createContext()

  export default function UserContextProvider(props){
  const [ userLogin, SetUserLogin] = useState(localStorage.getItem("userToken" ))

    // useEffect(()=>{
    //     if(localStorage.getItem("userToken")){
    //         SetUserLogin(localStorage.getItem("userToken"))
    //     }},[])
   

   


    return(
  
    <UserContext.Provider value={{userLogin ,SetUserLogin }}>{props.children}</UserContext.Provider>

   )

 }