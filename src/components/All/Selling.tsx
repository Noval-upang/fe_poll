import { useState } from "preact/hooks";
import Container from "../helpers/Container";
import { DB, Func } from "../helpers/init";
import SellingAdmin from '../Admin/Selling/Selling';
import SellingWorkers from '../Workers/Selling';


export default function ({role}:{role:string}) {
   const 
      [selling, setSelling] = useState([] as DB.Selling[]),
      [product, setProduct] = useState([] as DB.Product[]),
      [group, setGroup] = useState("" as "product" | "workers" | "category")


   Func
      .get<DB.Selling[]>("/auth/selling_all")
      .then((res)=>setSelling(res.data))
   
   Func
      .get<DB.Product[]>("/auth/product_all")
      .then((res)=>setProduct(res.data))
   

   return <>
      {/**export */}
      <div className="flex">
         <h1 class="text-bold text-xl">Export</h1>
         <button type="button"  class="flex justify-end">
            <span  class ={``}></span >
            <button type="button">Export as file</button>
         </button>
      </div>

      <Container>
         <>
         {/* Filter */} 
         {role === "admin" && 
            <div className="flex p-3">
               <h1 className='text-xl font-bold'>Group by</h1>
               <button type="button" onClick={()=>setGroup("product")}>Product</button>
               <button type="button" onClick={()=>setGroup("workers" )}>Workers</button>
               <button type="button" onClick={()=>setGroup("category")}>Category</button>
            </div>
         }

         <div className="rounded-sm">
            {role === "admin" ? 
               <SellingAdmin groupBy={group} selling={selling} product={product}/> : 
               <SellingWorkers selling={selling} product={product}/>
            }
         </div>

         </>
      </Container>
    </>
}