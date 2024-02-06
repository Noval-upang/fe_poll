import { useState } from "preact/hooks"
import { Func, DB } from "../helpers/init"

type Form = {name:string, qty:number, price:number, subTotal:number}

export default function () {
   const 
      [product, setProduct] = useState([] as DB.Product[]),
      [selling, setSelling] = useState([] as Form[]),
      [form, setForm] = useState( {} as Form)

   Func
      .get("/auth/product_all")
      .then(res=> setProduct(res.data as DB.Product[]))

   return <>
      {/* Top */}
      <div className="flex">
         <button onClick={()=>{}}><span>icon</span>Done</button>
         <button type="button"><span>+</span>Add</button>
      </div>
      {/* Form */}
      <div className="hidden fixed h-screen w-screen bg-[rgb(0,0,0,0.5)]">
         <div className="p-2 bg-white flex flex-col shadow-md">
            <input type="text" value={form.name} onInput={e=>setForm({...form, name:Func.getValue(e)})}  />
            {product.some(i=>i.name === form.name) && 
               <p class="bg-red-500 p-2 text-white rounded-md">Product don't exists</p>}

            <input type="number" value={form.qty} onInput={e=>setForm({...form, qty:Func.getValue(e)})}  />

            <input type="number" value={form.price} onInput={e=>setForm({...form, price:Func.getValue(e)})}  />

            <button onClick={()=>{
               const 
                  price = !form.price ? 
                     product.find(j=>j.name === form.name)!.price :
                     form.price,
                  subTotal = price * form.qty
               setSelling([...selling, {...form, price, subTotal}])
            }}></button>
         </div>
      </div>

      {/* Table */}
      <div className="">
         <div className="flex w-full">
            <p class="w-1/4">Name</p>
            <p class="w-1/4">Quantity</p>
            <p class="w-1/4">Price</p>
            <p class="w-1/4">Subtotal</p>
         </div>

         {selling.map((i)=>
            <div className="flex w-full">
               <p class="w-1/4">{i.name}</p>
               <p class="w-1/4">{i.qty}</p>
               <p class="w-1/4">{i.price}</p>
               <p class="w-1/4">{i.subTotal}</p>
            </div>
         )}

         <div className="w-full flex justify-end">
            <p className="3/4">Total</p>
            <p class="w-1/4">{selling.reduce((prev,i)=>i.subTotal + prev, 0)}</p>
         </div>
      </div>
   </> 
}