import { PurpleButton } from "../components/Button/purpleButton";
import { useAppSelector } from "../redux/services/Hooks";
import {  selectAuth } from "../redux/services/authslice";

import { useEffect ,useState} from "react";

export const Home:React.FC =()=>{
  const [name,setName] = useState<string>("") ;
  const [role,setRole] = useState<string>("") ;

  useEffect(()=>{
    const local:any = localStorage.getItem("user");
    console.log(local) ;
    if(local)   {
      const localObject = JSON.parse(local) ;
      setName(localObject.name) ;
    }
  },[])

  const {authToken,refreshToken}=useAppSelector(selectAuth);
 
    return(
        <section className="w-full max-w-xs mx-auto mt-4">
            <div>
            <h1 className='text-center text-2xl pb-4 font-bold text-violet-700'>Welcome to the Home Page</h1>
            <h3>{name}</h3>
            </div>
            {authToken && <PurpleButton title="OpenMap" route="/map"/>}
            
        </section>
    )
}




