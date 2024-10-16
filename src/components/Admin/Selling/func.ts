import { DB, Func } from "../../helpers/init";
import { SellingObject, WorkersObject } from "./types";

function getSellingList(selling:DB.Selling[]) {
   return selling
      // change json data to array
      .map((i)=>JSON.parse(i.productList) as DB.SellingList[])
      // concat every array
      .reduce((prev, i)=>[...prev, ...i], [])
}

export function groupProduct(selling:DB.Selling[], product:DB.Product[]) {
   return getSellingList(selling)
      .reduce((prev, i, _)=>{
         if (prev.some(j=>j.id === i.id)) {
            const index = prev.findIndex(j=> j.id === i.id)
            prev[index].provit = i.qty * i.price + prev[index].provit
            prev[index].qty = i.qty + prev[index].qty
         }
         const prod = product.find((j)=>j.id === i.id)!
         return [
            ...prev, 
            {
               id:i.id, 
               name: prod.name, 
               category: prod.category,
               qty:i.qty, 
               provit:i.qty * i.price
            }
         ]
      }, [] as SellingObject[])
}

export function groupCategory(selling:DB.Selling[], product:DB.Product[]) {
   return groupProduct(selling, product)
      .sort((a, b)=>
         a.category < b.category ? 
            -1 : 
         b.category > a.category ? 
            1 : 
         a.category === b.category ? 
            0 : 0 
      )     
}

export async function groupWorker(
      selling:DB.Selling[], 
      product:DB.Product[]
   ) {
   const {data} = await Func.get<DB.User[]>("")
   return selling.reduce((prev, i)=> {
      const dataWorker = {
         date:i.date,
         workerName:data.find(j=>j.id === i.id)!.name,
         productList: groupProduct([i], product) as Pick<SellingObject, "name"| "qty">[], 
         provit: i.provit
      } as WorkersObject
      
      return [...prev, dataWorker] 
   }, [] as WorkersObject[])
}