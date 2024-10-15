import { useEffect } from "react"
import {   Css, DB, Func } from "../../../../helpers/init"
import { Icon, ShortWord } from "./helpers"

export type Data = DB.Selling | undefined
type Props = {
    getter: Data
    setter: React.Dispatch<React.SetStateAction<Data>>
    product: DB.Product[]
    workers: DB.User[]
}

const 
    showLongDescript = (origin:string) => (
        () => {
            const   
                target = document.getElementById("descipt")!,
                button = document.getElementById("long_letter")!
            
            target.innerHTML = origin
            button.style.display = "none"
        }
    )

export default ({getter, setter, product, workers}: Props) => {
    const 
        parse = JSON.parse(getter?.list ?? "[]") as DB.SellingList[]
    
    useEffect(()=> {
        const elm = document.getElementById("more_detail") as HTMLDialogElement
        !getter ? elm.close() : elm.show()
    }, [JSON.stringify(getter)])   
    

    return <dialog id="more_detail" className="bg-transparent">
        <div className="bg-white w-[85vw] h-[90vh]">
            <div className="h-full flex flex-col justify-between">
                <div className="flex shadow-md py-2 justify-between">
                    <div className="ml-3">
                        <ShortWord 
                            max={13} 
                            origin={workers.find(i=> i.id === getter?.id_worker)?.name ?? ""}
                            className="font-bold tracking-wider text-2xl"/>

                        <p className="font-light text-xl mt-2">{Func.createTime(getter?.date)}</p>
                    </div>
                    <button onClick={()=>setter(undefined)} className={Css.icon + "text-3xl p-2"}>close</button>
                </div>
                <div className="overflow-auto h-full">
                    {parse?.map(i=>
                        <div className="p-3 border-b-2">
                            <p className="text-lg font-medium">{product.find(j=>j.id === i.id)?.name}</p>

                            <div className="flex mt-3 my-1 gap-3">
                                <Icon iconName="cards" value={i.qty.toString()} color="text-[#8b4513]"/>
                                <Icon iconName="attach_money" value={i.price.toString()} color="text-green-400"/>
                                <Icon iconName="price_check" value={(i.qty * i.price).toString()} color="text-yellow-300"/>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="flex border-t-2">
                    <p className="w-full font-bold p-2">Total</p>
                    <p className="w-1/3 bg-gray-200 text-center p-2">{getter?.total}</p>
                </div>
            </div>
        </div>
    </dialog>
}