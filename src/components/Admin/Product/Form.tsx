import {   Css, DB, Func, Types } from "../../helpers/init";
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ProductInDBCtxt } from "./Product";
import { useParams } from "react-router-dom";


export const 
    openForm = (open:boolean) => {
        const elm = document.getElementById("form")!.style 
        if (open) elm.display="block"
        else elm.display="none"
    },

    Form =  ({edit, setEdit, onSubmit} : {edit?: number, setEdit: Types.Setter<number | undefined>, onSubmit : (props:DB.Product) => void}) => {
        const 
            {id} = useParams(),
            [form, setForm] = useState({} as DB.Product),
            [err, setErr] = useState<string>(),
            [loading, setLoading] = useState(false),

            productFormDB = useContext(ProductInDBCtxt),

            productAlreadyExists = (i:DB.Product) => 
                i.name === form?.name && i.category === form?.category,

            submit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                setLoading(true)
                const 
                    price = form?.price || 0,
                    qty = form?.qty || 0

                Func
                    .post(`/company/${id}/product_add`, form)
                    .then(()=> onSubmit({...form, price, qty}))
                    .catch(({data}) => setErr(data))

                
                setLoading(false)
            },
            showCover = (show: boolean) => {
                const elm = document.getElementById("input-cover")!
                show ? elm.style.visibility = "visible" : elm.style.visibility = "hidden"
            }
        

        useEffect(()=>{
            // validate
            const 
                productExistsInDB = !!
                productFormDB.find(i=>productAlreadyExists(i))
            if(form !== undefined
                 && productExistsInDB)
                setErr("Product already exists")

            else setErr(undefined)     
            
            
        }, [form])
            
        return <form 
            className="fixed hidden top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)]" 
            id="form"
            >

            <div 
                className="
                    absolute bottom-0 bg-white 
                    md:bottom-1/2 md:left-1/2 
                    md:-translate-x-1/2 md:-translate-y-1/2 
                    md:h-[80%] md:w-[80%]">
                <div className="flex justify-between border-y-2 border-t py-2 items-center">
                    <p className="font-medium tracking-wide text-xl ml-4">Edit Mode</p>
                    <button 
                        type="button"
                        className={Css.icon + "text-2xl text-red-500 mr-2"} 
                        onClick={()=>{
                            if (edit) {
                                setEdit(undefined)
                                setForm({} as DB.Product)
                                setErr(undefined)
                            }
                            openForm(false)
                        }}>close</button>
                </div>
                <div className="flex flex-col gap-4 p-2 px-3">
                    <div className="flex flex-col">
                        <p className="font-medium tracking-wider">Name : dwada</p>
                        <div className="grid grid-cols-[65%_35%] gap-2 justify-between mt-1 items-center">
                            <input 
                                type="text" 
                                required
                                className="border w-full h-full px-2" 
                                value={edit ? 
                                    productFormDB.find(i=>i.id === edit)!.name : 
                                    (form.name ?? "")
                                }
                                onChange={(e)=> setForm({...form, name: e.target.value})} />
                                
                            <label 
                                className="relative bg-[royalblue] rounded-md p-2 border"
                                onClick={() => showCover(false)}
                                onMouseLeave={() => showCover(false)}
                                onMouseEnter={() => showCover(true)}>
                                <input
                                    type="text" 
                                    required
                                    className="text-lg text-center w-full bg-transparent text-white outline-none" 
                                    value={edit ? 
                                        productFormDB.find(i=>i.id === edit)!.category:
                                        form.category ?? "Category"
                                    }
                                    onChange={(e) => setForm({...form, category: e.target.value})}/>
                                <div className={Css.gridC + "invisible absolute left-0 top-0 z-10 w-full h-full bg-[royalblue] opacity-75"} id="input-cover">
                                    <p className="text-lg font-bold tracking-wider">Change</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-medium tracking-wider">Quantity : </p>
                        <input 
                            type="number" 
                            required
                            className="p-2 py-3 border mt-1 text-sm" 
                            value={edit ? 
                                productFormDB.find(i=>i.id === edit)!.qty : 
                                (form.qty ?? "")
                            }
                            onChange={(e)=>setForm({...form, qty: Number(e.target.value)})}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-medium tracking-wider">Price : </p>
                        <input 
                            type="number" 
                            required
                            className="p-2 py-3 border mt-1 text-sm" 
                            value={edit ? 
                                productFormDB.find(i=>i.id === edit)!.price : 
                                (form.price ?? "")
                            }
                            onChange={(e)=>setForm({...form, price: Number(e.target.value)})}/>
                    </div>

                    <button 
                        type="submit" 
                        className="p-1 py-3 bg-blue-400 font-bold text-white rounded-lg mt-4"
                        >Submit</button>
                </div>
            </div>
        </form>
    }