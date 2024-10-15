import { useMetaData } from "../../All/Selling"
import { Css, DB } from "../../helpers/init"

export default () => {
    const 
        {product, selling} = useMetaData(),
        tableSyle = "text-center border-r text-sm ",

        parseData = selling
            .filter(i=>!i.pending)
            .map(i=>JSON.parse(i.list ?? '[]') as DB.SellingList[])
            .reduce((prev, i) => [...prev,...i], []),

        concatData = parseData
            .reduce((prev, i)=>{
                const saved = prev.find(j=> i.id === j.id)
                if (!saved) return [{id:i.id, totalQty: i.qty, totalProvit: i.price * i.qty}]
                return [...prev, {id:saved.id, totalQty: saved.totalQty + i.qty, totalProvit: saved.totalProvit + (i.price * i.qty)}]
            }, [] as {id:number, totalQty:number, totalProvit:number}[])

   return <>
      <p className="font-bold m-2 text-lg">Kalkulasi Penjualan</p>  
      
      <div className="p-2 border-b-2">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">name</h1>
            <p className="p-1 px-3 rounded-full text-medium bg-blue-500 text-center text-white">category</p>
         </div>

         <div className="flex justify-between mt-3">
            <div className="flex items-center">
               <span className={Css.icon + "text-[#8b4513] text-3xl"}>cards</span>
               <p className="text-xl ml-1">100</p>
            </div>

            <div className="flex items-center">
               <div className="relative">
                  <span className={Css.icon + "text-3xl text-[#8b4513]"}>cards</span>
                  <span className={Css.icon + "text-4xl absolute top-0 translate-x-1/3 translate-y-1/4  right-0 text-black"}>arrow_upward_alt</span>
               </div>
               <p className="text-xl ml-1">100</p>
            </div>

            <div className="text-xl font-medium">200</div>
         </div>
      </div>
   </> 
}