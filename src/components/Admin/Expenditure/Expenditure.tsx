import { Signal, useSignal } from "@preact/signals-react"
import { Func } from "../../helpers/init"
import Table from './Table'
import { createContext } from "react"
import FormCom from "./Form"
import { useParams } from "react-router-dom"

export type Form = {name:string, descprint:string, subTotal:number}
export const 
   FormCtx = createContext<Signal<Form[]>| null>(null)


export default () => {
   const 
      param = useParams(),
      err = useSignal([] as Form[]),
      sellingForm = useSignal([] as Form[]),
      submit = () =>  {
         Func.post(`/auth/company/${param.role}/${param.id}/expenditure_add`, sellingForm.value)
            .then(()=> {})
            .catch((res)=> err.value = res.response.data)
      }

   return <>
      {/* Top */}
      <div className="flex">
         <button onClick={submit}><span>icon</span>Done</button>
         <button type="button"><span>+</span>Add</button>
      </div>
      
      <FormCtx.Provider value={sellingForm}>
         {/* Form */} 
         <FormCom/>

         {/* Table */}
         <Table />
      </FormCtx.Provider>
   </> 
}
