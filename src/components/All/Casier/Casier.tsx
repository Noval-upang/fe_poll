import { Form } from "./Form"
import { Constants, Css, DB, Func } from "../../helpers/init"
import Action from "./Action"
import Table from "./Table"
import { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Dummie } from "../../helpers/dummie"
import Container from "../../helpers/Container"
import Navbar from "../Navbar/Navbar"

type Cntx<T> = {get: T, set: React.Dispatch<React.SetStateAction<T>>} | undefined

export const 
   PendingCntx = createContext<Cntx<boolean>>(undefined),
   FormCntx = createContext<Cntx<DB.Product[]>>(undefined),
   ProductCntxt = createContext([] as DB.Product[]),

   EditCntx = createContext<Cntx<DB.Product|undefined>>(undefined)

export default function () {
   const 
      [productInDB, setProductInDB] = useState([...Dummie.product,...Dummie.product,...Dummie.product,...Dummie.product]),
      [form, setForm] = useState([...Dummie.product,...Dummie.product] as DB.Product[]),
      [pending, setPending] = useState(false),
      [edit, setEdit] = useState<DB.Product>(),

      {id} = useParams()

   // useEffect(() => {
   //    Func
   //       .get(`${Constants.CompanyURL}/${id}/product_all`)
   //       .then(({data}) => setProductInDB(data as DB.Product[]))
   // }, [])

   
   

   return <>   
      <FormCntx.Provider value={{get: form, set: setForm}}>
         <PendingCntx.Provider value={{get:pending, set: setPending}}>
            <EditCntx.Provider value={{get: edit, set:setEdit}}>
               <ProductCntxt.Provider value={productInDB}>
                  <div className="flex flex-col h-screen">
                     <Navbar/>
                     {/*  */}
                     <div className="flex overflow-hidden h-full">
                        <div className="h-full w-full overflow-hidden grid grid-cols-1 justify-between border-r md:w-[40%] lg:w-[35%]">
                           <div className="overflow-auto">
                              <Table />               
                           </div>
                           <div className="mt-auto">
                              <Action />
                           </div>
                        </div>

                        {/*  */}
                        <div className="md:w-[60%] lg:w-[75%] overflow-auto">
                           <Form
                              onSubmit={(data) => edit ? 
                                 setForm((prev) => prev.map(i=> edit.id === i.id ? data : i)): 
                                 setForm((prev) => [...prev,  data])}
                              title={edit ? "Edit data" : "Add product"}
                              edit={edit}
                              setEdit={setEdit} />
                        </div>
                     </div>


                  </div>
               </ProductCntxt.Provider>
            </EditCntx.Provider>
         </PendingCntx.Provider>
      </FormCntx.Provider>
   </> 
}