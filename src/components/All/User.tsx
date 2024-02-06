import { useState } from 'preact/hooks';
import {Func} from '../helpers/init';
import { ErrorMsg } from "./helpersComp";
import { useSignal } from "@preact/signals";

type Form = Partial<{email:string, password:string, password2:string}>

export default function () {
   const 
      form = useSignal({} as Form),
      errForm = useSignal({} as Form),
      [method, setMethod] = useState("login" as "login" | "register"),

      // next func after submit
      register = () => {
         form.value = {}
         setMethod("login")
      },
      login = () => {
         window.location.pathname = "/control-access"
      },

      submit = () => {
         Func.post(`/${method}`, form)
            .then(()=>method === "register" ? register() : login())
            .catch(res=>errForm.value = res.response.data)
      }
   
   return <div className="grid place-items-center w-screen h-screen">
      <form onSubmit={()=>submit()} className="flex flex-col shadow-lg h-fit w-fit">
         <p className="text-center font-bold text-xl border-b border-[rgb(0,0,0, 0.25)]">Sign Up</p>
         <input 
            type="text" 
            value={form.value.email} 
            onInput={(e) => 
               form.value = {...form, email:Func.getValue(e)}} 
            required/>
         <ErrorMsg msg={errForm.value.email}/>

         <input 
            type="password" 
            value={form.value.password} 
            onInput={(e) => 
               form.value = {...form, password:Func.getValue(e)}} 
            required/>
         <ErrorMsg msg={errForm.value.password}/>

         {method === "register" && <>
            <input 
               type="password" 
               value={form.value.password2} 
               onInput={(e) => 
                  form.value = {...form, password2:Func.getValue(e)}}  
               required/>
            <ErrorMsg msg={errForm.value.password}/>
         </>}

         <button type="submit">{method[0].toUpperCase() + method.slice(1)}</button>
      </form>
   </div> 
}