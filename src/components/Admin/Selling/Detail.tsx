import { useSignal } from "@preact/signals-react"
import {   Css, DB, Func } from "../../helpers/init"
import { useParams } from "react-router-dom"

type w = Pick<DB.SellingList, "id" | "qty">[]

export default () => {
    const 
        {product, selling} = useMetaData(),
        // {role, id} = useParams(),
        workers = useSignal([{email: "dwdwd@wdw", id:1, name: "dwdw"}] as DB.User[]),

        parseData = selling
            .reduce((prev ,i)=> {
                const 
                    saved   = prev.get(i.id_worker) || [],
                    parse   = JSON.parse(i.list ?? "[]") as w,
                    data    = saved
                        .map(j=> ({
                            ...j, 
                            qty: parse
                                .find(jj => jj.id === j.id)!.qty + j.qty
                        }))

                return prev.set(i.id_worker, saved.length > 0 ? data : parse)
            }, new Map<number, w>())
        
    // Func
    //     .get<DB.User[]>(`/${Constants.CompanyURL}/${role}/${id}/workers_all`)
    //     .then(({data}) => workers.value = data)
    
    return <>
        <p className="font-bold text-lg m-2 mt-6">Selling Detail</p>

        <div className="flex border mt-2">
            <p className={Css.gridC + "w-[35%] font-medium border-r"}>Name</p>

            <div className="w-[65%]">
                <p className="border-b text-center p-1 font-medium">Product sold</p>
                <div className="flex">
                    <p className="w-[60%] text-center p-1 font-medium border-r">Name</p>
                    <p className="w-[40%] text-center p-1 font-medium">Qty</p>
                </div>
            </div>    
        </div>

        {workers.value.map(i=>                
            <div className="flex border">
                <p className={Css.gridC + "w-[35%] border-r"}>{i.name}</p>

                <div className="w-[65%]">
                    {parseData.get(i.id)!.map(i=>
                        <div className="flex">
                            <p className="w-[60%] text-center p-1 border-r">{product.find(j=>j.id === i.id)!.name}</p>
                            <p className="w-[40%] text-center p-1">{i.qty}</p>
                        </div>
                    )}
                </div>    
            </div>
        )}
    </>
}

