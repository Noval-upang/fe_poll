import { StateUpdater, useState } from "preact/hooks"
import { DB, Func } from "../helpers/init"

type FormData = DB.SellingList & {name:string}
type Props = { 
   products:DB.Product[]
   setForm: StateUpdater<FormData[]> 
}


function Form({ products, setForm }: Props) {
   const 
      [name, setName] = useState(""),
      [qty, setQty] = useState<number>(),
      [price, setPrice] = useState<number>(),

      setLocalForm = (product: DB.Product) => {
         return () => {
            setName(product.name)
            setQty(product.qty)
            setPrice(product.price)
         }
      }
      
   return <div 
      id="form" 
      className="fixed top-0 left-0 bg-[rgb(0,0,0,0.5)]">

      <div className="flex mt-16 p-3 rounded-md bg-white" >
         <input 
            type="text" 
            value={name} 
            onInput={(e)=>setName(Func.getValue(e))} 
            id="form-name"
            />

         {/* @ts-ignore */}
         <dialog className="absolute bottom-[anchor(bottom)]" open anchor="form-name">
            {products.map(i=>
               <button onClick={setLocalForm(i)}>{i.name}</button>
            )}
         </dialog>

         <input 
            type="number" 
            value={qty} 
            onInput={(e)=>setQty(Func.getValue(e))} />
         <input 
            type="number" 
            value={price} 
            onInput={(e)=>setPrice(Func.getValue(e))} />
         
         <button 
            onClick={()=>setForm((prev)=>[
               ...prev, 
               {  
                  name, 
                  qty:qty!, 
                  price:price!, 
                  id:products.find(i=>i.name === name)!.id
               }]
            )}>Add</button>
      </div>
   </div>
}

export default function () {
   const 
      [form, setForm] = useState([] as FormData[])

   return <>
      <div className="flex justify-end">
         <button className="flex">
            <span>icon</span>
            <p>Pending payment</p>
         </button>
         <button className="flex">
            <span>icon</span>
            <p>Done</p>
         </button>
         <button className="flex">
            <span>icon</span>
            <p>Add</p>
         </button>
      </div>

   </> 
}