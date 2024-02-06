import { useState } from "preact/hooks";
import { DB } from "../../helpers/init";
import {groupCategory, groupProduct, groupWorker} from "./func";
import { SellingObject, WorkersObject, Props } from "./types";

export default function ({groupBy, product, selling}: Props) {
   const 
      [datas, setDatas] = useState([] as Partial<SellingObject & WorkersObject>[]),
      groupByWorkers = groupBy === "worker"
      
   
   groupByWorkers ? 
      groupWorker(selling, product).then(setDatas) :
   groupBy === "product" ?
      setDatas(groupProduct(selling, product)) :
      setDatas(groupCategory(selling, product))

   return <>
      <div className="flex">
         {groupByWorkers && 
            <p className="w-full">Date</p>
         }
         <p className="w-full">Name</p>

         {groupByWorkers && 
            <p className="w-full">List product</p>
         }
         
         {!groupByWorkers &&
            <>
               <p className="w-full">Category</p>
               <p className="w-full">Quantity</p>
            </>
         }
         <p className="w-full">Provit</p>
      </div>

      {datas.map(i=> 
         <div className="flex">
            {groupByWorkers && 
               <p className="w-full">{i.date}</p>
            }
            <p className="w-full">
               {groupByWorkers ? i.workerName : i.name}
            </p>

            {groupByWorkers && 
               <p className="w-full">{i.productList}</p>
            }
            
            {!groupByWorkers &&
               <>
                  <p className="w-full">{i.category}</p>
                  <p className="w-full">{i.qty}</p>
               </>
            }
            <p className="w-full">{i.provit}</p>
         </div>
      )}
   </> 
}