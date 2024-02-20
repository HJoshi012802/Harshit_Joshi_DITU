import { Link } from "react-router-dom";
import { PurpleButton } from "./Button/purpleButton";
import { useAppDispatch, useAppSelector } from "../redux/services/Hooks";
import { logout, selectAuth } from "../redux/services/authslice";

export const Header:React.FC =()=>{
  const {authToken} = useAppSelector(selectAuth);
  const dispatch =useAppDispatch();
  
  const handlelogout =()=>{
    dispatch(logout());
  }

   if(authToken){
    return(
        <main className="text-center bg-gray- rounded shadow-xl">
        <header className="flex justify-between  py-6 mx-12 mb-5 font-xl ">
       <Link to="/" className="font-roboto font-bold text text-xl bg-black  bg-clip-text p-2">Movers&Packers</Link>
       <nav>
        <PurpleButton  title="LogOut" flag={true} />
       </nav>
     </header >
    </main>
    )
   }else{
    return(
        <main className="text-center bg-gray- rounded shadow-xl">
        <header className="flex justify-between  py-6 mx-12 mb-5 font-xl ">
       <Link to="/" className="font-roboto font-bold text text-xl bg-black  bg-clip-text p-2">Movers&Packers</Link>
       <nav>
        <div className='flex gap-3  items-center'>
        <PurpleButton title="LogIn" route="/login"/>
        <PurpleButton title="Register" route="/register"/>
        </div>
        </nav>
     </header>
     </main>
    )
   }
}