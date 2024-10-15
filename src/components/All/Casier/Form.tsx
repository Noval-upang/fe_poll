import {   Css, DB,  Func,  Types } from "../../helpers/init";
import {  useContext, useEffect, useState } from "react";
import { openSelect, SelectProduct } from "./SelectProduct";
import ErrorMsg from "../../helpers/ErrorMsg";
import { ProductCntxt } from "./Casier";

type Props = {
    // optional
    edit: DB.Product | undefined, 
    setEdit: Types.Setter<DB.Product | undefined>,

    // required
    onSubmit : (props:DB.Product) => void, 
    title:string
} 

type ErrRecord = Record<"name"|"qty"|"price", string>

export const 
    openForm = (open:boolean) => {
        const elm = document.getElementById("form")!.style 
        if (open) elm.display="block"
        else elm.display="none"
    },

    Form =  (
        {edit, setEdit, onSubmit,  title} : 
        Props
    ) => {
        const 
            [form, setForm] = useState({} as DB.Product),
            [err, setErr] = useState<ErrRecord>(),

            productInDB = useContext(ProductCntxt),

            submit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const 
                    price = form?.price || 0,
                    qty = form?.qty || 0
                
                onSubmit({...form, price, qty})
                setForm({} as DB.Product)
                openForm(false)
            },

            clearZeroOnFirst = (id:string, event: React.ChangeEvent<HTMLInputElement>) => {
                const elm = document.getElementById(id) as HTMLInputElement
                if (/^0+/.test(event.target.value)) 
                    elm.value = `${event.target.value.replace(/^0+/, '')}`
            }
        

        useEffect(()=>{            
            if(form.qty < 1 || form.price < 1) {
                const msg = "This field cannot less then 1"
                setErr((prev) =>
                    ({
                        ...prev, 
                        qty: form.qty < 1 && msg, 
                        price: form.price < 1 && msg
                    }) as ErrRecord
                )
            }

            if(form.name && !productInDB.some(i=>i.name === form.name)) 
                setErr((prev) =>({...prev, name:"Product not found"}) as ErrRecord)
            
            else setErr(undefined)     
            
        }, [form])

        useEffect(() => {
            const formEnteries = Object.entries(form)
            if(edit && !Object.entries(edit).every(i=>formEnteries.includes(i)))
                setForm(edit)
        }, [edit])

        
        
        return <>            
            <SelectProduct setForm={(data)=>setForm({...data} as DB.Product)} product={productInDB} />

            <form 
                className="fixed hidden top-0 left-0 w-screen h-screen z-10 bg-[rgb(0,0,0,0.5)]" 
                id="form"
                onSubmit={submit}>
                <div className="
                    absolute bottom-0 bg-white 
                    w-full md:w-[60%] md:rounded-md
                    md:bottom-[unset] md:top-1/2 md:left-1/2 
                    md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="flex justify-between border-y-2 border-t py-2 items-center">
                        <p className="font-medium tracking-wide text-xl ml-4">{title}</p>
                        <button 
                            type="button"
                            className={Css.icon + "text-2xl text-red-500 mr-2"} 
                            onClick={()=>{
                                if (Object.keys(edit ?? {}).length < 1) {
                                    setEdit(undefined)
                                    setForm({} as DB.Product)
                                    setErr(undefined)
                                }
                                openForm(false)
                            }}>close</button>
                    </div>

                    <div className="flex flex-col gap-4 p-2 px-3">

                        {/* input name */}
                        <div className="flex flex-col">
                            <p className="font-medium tracking-wider">Name :</p>
                            <div className="grid grid-cols-[65%_35%] gap-2 justify-between mt-1 items-center">

                                <div 
                                    onClick={() => openSelect(true)}
                                    className="text-lg text-left p-2 w-full outline-none border h-full">
                                        <p className={`${(edit?.name || form?.name) ? "text-black" : "text-white"}`}>
                                            {form?.name ?? ""}
                                        </p>
                                </div>

                                <div className={`
                                    ${Css.gridC} text-lg text-center w-full outline-none border h-full ${(edit?.category || form?.category) ? "bg-[royalblue] rounded-md" : "bg-white"}
                                    `}>
                                        <p className={`${(edit?.category || form?.category) ? "text-white" : "text-gray-300"}`}>
                                            {form?.category ?? "Category"}
                                        </p>
                                </div>
                                
                            </div>
                            <ErrorMsg msg={err?.name}/>
                        </div>

                        {/* input qty */}
                        <div className="flex flex-col">
                            <p className="font-medium tracking-wider">Quantity : </p>
                            <input 
                                required
                                type="number" 
                                className={`p-2 py-3 border mt-1 text-sm ${err?.qty && "border-red-500"}`}
                                value={form.qty ?? ""}
                                id="form-qty"
                                onChange={(e)=>{
                                    clearZeroOnFirst("form-qty", e)

                                    const data = e.target.value.replace(/^0+/, "")
                                    setForm({...form, qty: Number(data)})}
                                }/>
                            <ErrorMsg msg={err?.qty}/> 
                        </div>

                        {/* input price */}
                        <div className="flex flex-col">
                            <p className="font-medium tracking-wider">Price : </p>
                            <input 
                                required
                                type="number" 
                                className={`p-2 py-3 border mt-1 text-sm ${err?.price && "border-red-500"}`}
                                id="form-price"
                                value={form.price ?? ""}
                                onChange={(e)=>{
                                    clearZeroOnFirst("form-price", e)

                                    const data = e.target.value.replace(/^0+/, "")
                                    setForm({...form, price: Number(data)})
                                }}/>
                            <ErrorMsg msg={err?.price}/> 
                        </div>

                        <button 
                            type="submit" 
                            className="p-1 py-3 bg-blue-400 font-bold text-white rounded-lg mt-4"
                            >Submit</button>
                    </div>
                </div>
            </form>

        </>
    }