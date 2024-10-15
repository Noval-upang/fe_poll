import { useEffect, useState } from "react"
import { Css, DB, Func, Types } from "../../../../helpers/init"
import { useParams } from "react-router-dom"
import { Dummie } from "../../../../helpers/dummie"
import DataShower from "./DataShower"
import EmptyData from "./EmptyData"
import MoreDetail, { Data } from "./MoreDetail"

export type DataSetter = {sell:DB.Selling[], exp:DB.Expenditure[]} | undefined

type Props = { 
    data: DataSetter,
    setData: Types.Setter<DataSetter>
} 

const datePicker = () => {

    const w = document.getElementById("datepicker") as HTMLInputElement
    w.showPicker()
    w
}
export default ({data, setData}: Props) => {
    const 
        // {role, id} = useParams(),

        [workers, setWorkers] = useState<DB.User[]>(Dummie.user),
        [product, setProduct] = useState(Dummie.product),

        [show, setShow] = useState("in" as "in" | "out"),

        [showData, setShowData] = useState(undefined as Data)

    // Func
    //     .get(`${Constants.CompanyURL}/${role}/${id}/workers_all`)
    //     .then((res)=>setWorkers(res.data as DB.User[]))

    // Func
    //     .get(`${Constants.CompanyURL}/${role}/${id}/product_all`)
    //     .then((res)=>setProduct(res.data as DB.Product[]))

    useEffect(() => {
        const elm = document.getElementById("detail") as HTMLDialogElement
        !data ? elm.close() : elm.showModal()
        
        
    }, [JSON.stringify(showData)])
    

    return <dialog id="detail" className={"backdrop:bg-[rgb(0,0,0,0.75)]"}>
        <div className="bg-white w-[85vw] h-[90vh] flex flex-col ">
            <div className="flex shadow-md mt-5">
                <button 
                    className={`p-2 font-medium ${show === "in" && "bg-gray-200 "} rounded-t-md border-t-2 border-x-2 ml-3`}
                    onClick={()=>setShow("in")}>Income</button>

                <button 
                    className={`p-2 font-medium ${show === "out" && "bg-gray-200 "} rounded-t-md border-t-2 border-x-2 ml-2`}
                    onClick={()=>setShow("out")}>Expenditure</button>

                <button 
                    className={Css.icon + "ml-auto text-3xl p-1 font-extrabold"} 
                    title="close"
                    onClick={()=>setData(undefined)}>close</button>
            </div>

            <div className="h-full overflow-auto">
                {!data ? null : 
                    show === "in" && data.sell.length > 0 ? data.sell.map(i=>{
                        return (
                            <DataShower 
                                name={workers.find(j => j.id === (i as DB.Selling).id_worker)!.name}
                                key={`income ${i.id}`}
                                time={Func.createTime(i.date)}
                                total={i.total}
                                pending={(i as DB.Selling).pending}
                                onClick={()=>setShowData(i)}
                                />
                        )}) :
                        
                    show === "out" && data.exp.length > 0 ? data.exp.map(i=>{
                        return (JSON.parse(i.list) as DB.ExpList[]).map(j=>
                            <DataShower 
                                name={j.todo}
                                key={`out ${i.id}`}
                                time={Func.createTime(i.date)}
                                total={j.total}
                                desc={j.descript ?? "no description"}
                            />
                        )}
                    ) : 
                    <EmptyData/>} 
            </div>

            <div className="flex border-t-4">
                <p className="w-full font-bold p-2">Total</p>
                <p className="w-1/3 bg-gray-200 text-center p-2">{
                    data === undefined ? 0 : 
                    show === "in" ? 
                        Func.sumArr(data!.sell, (i) => i.total): 
                        Func.sumArr(data!.exp, (i) => i.total)
                }</p>
            </div>
            
            
    
            <MoreDetail getter={showData} setter={setShowData} product={product} workers={workers}/> 
        </div>
    </dialog>
}

