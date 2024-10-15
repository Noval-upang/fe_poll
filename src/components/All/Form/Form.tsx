import {   Css, DB,  Types } from "../../helpers/init";
import {  useEffect, useState } from "react";
import { ErrorMsg } from "../helpersComp";
import Loading from "../Loading";

type Props = {
    // optional
    edit?: DB.Product, 
    setEdit?: Types.Setter<DB.Product | undefined>,
    onClickName : () => void,

    // required
    // if return true is no error
    onSubmit : (props:DB.Product) => boolean, 
    err: Partial<DB.Product>
    title:string
} 

export const 
    openForm = (open:boolean) => {
        const elm = document.getElementById("form")!.style 
        if (open) elm.display="block"
        else elm.display="none"
    },

    Form =  (
        {edit, setEdit, onSubmit, title, onClickName, err} : 
        Props
    ) => {
        const 
            [form, setForm] = useState({} as DB.Product),
            [loading, setLoading] = useState(false),


            submit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                setLoading(true)
                const 
                    price = form?.price || 0,
                    qty = form?.qty || 0

                if(onSubmit({...form, price, qty}))     
                    openForm(false)
                
                setTimeout(() => {
                    setLoading(false)
                }, 1000);

            }

            useEffect(()=>{
                if(
                    edit && 
                    !Object
                        .entries(edit)
                        .every((i) => Object.entries(form).includes(i))
                )
                    setForm(edit)
            }, [edit])
        
        
        return <form 
            className="fixed hidden top-0 left-0 z-10 w-screen h-screen bg-[rgb(0,0,0,0.5)] " 
            id="form"
            onSubmit={submit}>
                <div 
                    className="
                        absolute bottom-0 
                        md:top-1/2 md:left-1/2 md:bottom-[unset]
                        md:-translate-x-1/2 md:-translate-y-1/2                   
                        ">
                    <div className="bg-white w-full md:rounded-md">
                        <div className="flex justify-between border-y-2 border-t md:border-t-0 py-2 items-center">
                            <p className="font-medium tracking-wide text-xl ml-4">{title}</p>
                            <button 
                                type="button"
                                className={Css.icon + "text-2xl text-red-500 mr-2"} 
                                onClick={()=>{
                                    if (edit && setEdit) {
                                        setEdit(undefined)
                                        setForm({} as DB.Product)
                                    }
                                    openForm(false)
                                }}>close</button>
                        </div>
                        
                        <div className="w-screen md:w-full md:h-fit">
                            {loading ? 
                                <div className={Css.gridC + "h-full"}>
                                    <Loading />
                                </div> : 
                                <div className="flex flex-col gap-4 p-2 px-3 h-full">
                                    <div className="flex flex-col">
                                        <p className="font-medium tracking-wider">Name :</p>
                                        <div className="flex gap-2 justify-between mt-1 items-center">
                                            <input 
                                                type="text" 
                                                required
                                                className={`text-lg w-[65%] p-2 border`}
                                                value={form.name ?? ""}
                                                onChange={(e)=> setForm({...form, name: e.target.value})} 
                                                onClick={() => onClickName()}/>
                                                
                                                
                                            <input
                                                type="text" 
                                                required
                                                className={`text-lg text-center w-[35%] ${form.category ? "text-white bg-[royalblue]" : "text-black bg-transparent"} outline-none p-2 border`}
                                                placeholder={"Category"}
                                                value={form.category ?? ""}
                                                onChange={(e) => setForm({...form, category: e.target.value})}/>

                                            {/* <label   */}
                                        </div>
                                        <div className="mt-1">
                                            <ErrorMsg msg={err.name} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 md:flex-row">
                                        <div className="w-full">
                                            <p className="font-medium tracking-wider">Quantity : </p>
                                            <input 
                                                type="number" 
                                                required
                                                className="p-2 py-3 border mt-1 text-sm w-full" 
                                                value={form.qty ?? ""}
                                                onChange={(e)=>setForm({...form, qty: Number(e.target.value)})}/>
                                        </div>

                                        <div className="w-full">
                                            <p className="font-medium tracking-wider">Price : </p>
                                            <input 
                                                type="number" 
                                                required
                                                className="p-2 py-3 border mt-1 text-sm w-full" 
                                                value={form.price ?? ""}
                                                onChange={(e)=>setForm({...form, price: Number(e.target.value)})}/>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <p className="font-medium tracking-wider">Description : </p>
                                        <textarea 
                                            className="w-full h-[7rem] resize-none p-2 border mt-1" 
                                            value={form.desc ?? ""}
                                            onChange={(e)=>setForm({...form, desc:e.target.value})}/>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="p-1 py-3 bg-blue-400 font-bold text-white rounded-lg mt-auto mb-4"
                                        >Submit</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
        </form>
    }