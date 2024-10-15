import { useParams } from "react-router-dom"
import { Constants, Css, DB, Func } from "../../helpers/init"
import { useContext, useEffect, useState } from "react"
import { FormCntx , PendingCntx } from "./Casier"
import Loading from "../Loading"
import { openForm } from "../Form/Form"



export default () => {
    const
        form = useContext(FormCntx)!,
        pending = useContext(PendingCntx)!,
        param = useParams(),

        style = "flex gap-1 rounded-md p-2 items-center justify-center ",

        [loading, setLoading] = useState(false),
        [success, setSuccess] = useState<undefined | boolean>(),
        [openTable, setOpenTable] = useState(true),

        submit = () => {
            setLoading(true)
            const date = new Date()
            Func
                .post(
                    `${Constants.CompanyURL}/${param.id}/selling_add`, 
                    {
                        list: JSON.stringify(form.get),
                        total: form.get.reduce((prev, i)=> prev + (i.price * i.qty), 0),
                        date: `${date.getDate()} ${date.toLocaleString("default", {month: "short"})} ${date.getFullYear()}`,
                        pending: pending.get
                    } as DB.Selling)
                .then(()=>{
                    setSuccess(true)
                    setTimeout(() => {
                        setLoading(false)
                        form.set([])
                    }, 1000)
                })
            
        }
         
    
    return (
        <div className="relative">
            <button className={Css.gridC + "block w-14 h-14 absolute rounded-full shadow-inner bg-blue-500 right-4 top-[-40%] md:hidden"}>
                <span className={Css.icon + "text-white font-bold"}>add</span>
            </button>

            <div className="flex flex-col h-full md:justify-end p-3 gap-3 bg-white border-t-2 md:border-b">
                <div className="flex justify-between">
                    <p className="text-lg font-medium">Total</p>
                    <p className="font-bold text-lg">{
                        Func.toCurrency(
                        form.get.reduce((prev, i) => prev + i.price * i.qty, 0)
                        )
                    }</p>
                </div>
                <button 
                    className={`${style} bg-yellow-300 md:py-2 cursor-pointer w-full`} 
                    onClick={()=>pending.set((p)=>!p)}
                    >
                    <span className={Css.icon }>{pending.get ? "check_circle" : "radio_button_unchecked"}</span>
                    <p className="font-medium">Pending Payment</p>
                </button>
                
                <button className={style + "bg-green-400 md:py-2 w-full"} onClick={submit}>
                    <span className={Css.icon + "text-black"}>check</span>
                    <p className="text-black font-medium">Done</p>
                </button>
            </div>


            {loading && 
                <div className={Css.gridC + "fixed h-screen w-screen bg-[rgb(0,0,0,0.5)] top-0 left-0"}>
                    <Loading success={success}/>
                </div>
            }
        </div>
    )
} 