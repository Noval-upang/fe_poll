import { useState } from 'react';
import {DB, Func} from '../helpers/init';
import { ErrorMsg } from "./helpersComp";

type Form =  Partial<Pick<DB.User, "email" | "name" | "password"> & {password2:string, errMsg:string, success:string}>

export default function () {
   const 
      [form, setForm] = useState({} as Form),
      [msg, setMsg] = useState({} as Form),
      [method, setMethod] = useState("login" as "login" | "register"),

      inputStyle = "mt-1 p-2 border rounded-sm outline-none w-full ",

      // next func after submit
      register = () => {
         setForm({})
         setMsg({success: "Register success"})
         setMethod("login")

      },
      login = (token:string) => {
         localStorage.setItem("token", token)
         window.location.pathname = "/"
      },

      submit = (e: {preventDefault: ()=> void}) => {
         e.preventDefault()
         setMsg({})
         Func.post(`/${method}`, form)
            .then((res)=>method === "register" ? register() : login(res.data as string))
            .catch(res=>setMsg(res.response.data))
      }

      console.log(msg);
      
   
   return <div className="grid place-items-center w-screen h-screen">
      <form onSubmit={submit} className="flex flex-col h-fit w-[90%] md:w-[50%]">
         <p 
            className="p-3 text-center font-bold text-xl text-white bg-green-600 rounded-t-md"
            >Sign {method === 'login' ? 'in' : "up"}</p>

         <div className="rounded-b-md border p-1 pt-2">
            {msg.success && 
               <div className='py-2 px-3 m-2 mb-4 bg-green-400 rounded-md'>
                  <p className='text-lg font-bold text-white'>{msg.success}</p>
               </div>
            }
            {method === "register" && 
               <div className="m-2">
                  <p className="font-medium">Name : </p>
                  <input 
                     type="text" 
                     className={inputStyle + `${msg.name && "border-red-500"}`}
                     value={form.name ?? ""} 
                     onInput={(e) => 
                        setForm({...form, name:Func.getValue(e)})} 
                     required/>
                  <ErrorMsg msg={msg.name}/>
               </div>
            }

            <div className="m-2">
               <p className="font-medium">Email : </p>
               <input 
                  type="text" 
                  className={inputStyle + `${(msg.email || msg.errMsg) && "border-red-500"}`}
                  value={form.email ?? ""} 
                  onInput={(e) => 
                     setForm({...form, email:Func.getValue(e)})} 
                  required/>
               <ErrorMsg msg={msg.email}/>
            </div>

            <div className="m-2">
               <p className="font-medium">Password : </p>
               <input 
                  type="password" 
                  className={inputStyle + `${(msg.password || msg.errMsg) && "border-red-500"}`}
                  value={form.password ?? ""} 
                  onInput={(e) => 
                     setForm({...form, password:Func.getValue(e)})} 
                  required/>
               <ErrorMsg msg={msg.password}/>
            </div>

            {method === "register" && <>
               <div className="m-2">
                  <p className="font-medium">Repeat password :</p>
                  <input 
                     type="password" 
                     className={inputStyle + `${msg.password && "border-red-500"}`}               
                     value={form.password2 ?? ""} 
                     onInput={(e) => 
                        setForm({...form, password2:Func.getValue(e)})}
                     required/>
                  <ErrorMsg msg={msg.password}/>
               </div>
            </>}

            <div className="ml-2 font-bold tracking-[0.02rem]">
               <ErrorMsg msg={msg.errMsg}/>
            </div>


            <div className="flex justify-between m-2">
               <button 
                  type="button" 
                  className="text-blue-600"
                  onClick={()=>{
                     setMsg({})
                     method === "register" ? 
                        setMethod("login") : 
                        setMethod("register")
                  }}>{method === "register" ? "< Go back" : "Create new account"}</button>
               <button 
                  type="submit"
                  className="mt-4 w-fit p-2 px-4 bg-green-600 text-white font-semibold"
                  >{method[0].toUpperCase() + method.slice(1)}</button>
            </div>
         </div>
      </form>
   </div> 
}