import Container from "../helpers/Container";
import { Css, DB, Func } from "../helpers/init";
import SellingAdmin from '../Admin/Selling/Selling';
import SellingWorkers from '../Workers/Selling';
import { useSignal } from "@preact/signals-react";
import { useParams } from "react-router-dom";
import { createContext, useContext} from "react";

export const 
   ProductCntx = createContext([] as DB.Product[]),
   SellingCntx = createContext([] as DB.Selling[]),
   useMetaData = () => (
      {product: useContext(ProductCntx), selling: useContext(SellingCntx)}
   )

export default function () {
   const 
      selling = useSignal([{date: "1 Jan 2021", id:1, id_worker:1, pending: false, list:JSON.stringify([{id:1, qty:22, price:1000}]),total:22000}] as DB.Selling[]),
      product = useSignal([{category:"sabun", id:1, id_company:1, name:"sabun mandi", price:1000, qty:100}] as DB.Product[]),
      {role, id} = useParams()

   Func  
      .get<DB.Selling[]>(`/auth/company/${role}/${id}/selling_all`)
      .then((res)=>selling.value = res.data)
   
   Func
      .get<DB.Product[]>(`/auth/company/${role}/${id}/product_all`)
      .then((res)=>product.value = res.data)
   
   
   return <>
      {/**export */}
      <div className="flex items-center justify-between py-4 px-2 bg-gray-100">
         <h1 className="text-bold text-xl font-medium text-white">Export</h1>
         <button type="button"  className="flex items-center rounded-md py-2 px-3 bg-blue-400">
            <span  className ={Css.icon}>download</span>
         </button>
      </div>

      <Container>
         <div className="rounded-sm">
            <ProductCntx.Provider value={product.value}>
               <SellingCntx.Provider value={selling.value}>
                  {role === "admin" ? 
 
                     <SellingAdmin /> : 
                     <SellingWorkers/>
                  }
               </SellingCntx.Provider>
            </ProductCntx.Provider>
         </div>
      </Container>
    </>
}