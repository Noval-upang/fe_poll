import { useMetaData } from "../All/Selling";
import { DB } from "../helpers/init";


export default function () {
   const {product, selling} = useMetaData()
   return <>
      <div className="flex">
         <p className="w-[10%]">Time</p>
         <p className="w-[80%]">List</p>
         <p className="w-[10%]">total</p>
      </div>

      {/* show list sell by worker */}
      {selling
         // parse json to actual data 
         .map(i=>
            ({
               ...i, 
               productList: JSON.parse(i.productList) as DB.SellingList[]
            })
         )

         // show data
         .map(i=> 
            <div className="flex">
               <p className="w-[10%]">{i.date}</p>

               <div className="w-[80%] flex">{i.productList.map(j=>
                  <>
                     <p className="w-full">{product.find(j=>j.id === i.id)!.name}</p>
                     <p className="w-full">{j.qty}</p>
                     <p className="w-full">{j.price}</p>
                  </>
               )}</div>

               <p className="w-[10%]">{i.total}</p>
            </div>
      )}
   </> 
}