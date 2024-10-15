import { useContext } from "react";
import {  EditCntx, FormCntx } from "./Casier";
import { Css, DB, Func } from "../../helpers/init";
import {openForm} from '../Form/Form'
import EmptyData from "../../Admin/Dasboard/Shift/Detail/EmptyData";

export default () => {
    const 
        form = useContext(FormCntx)!,
        edit = useContext(EditCntx)!

    return <div className="flex flex-col gap-2 my-4 mx-2">
        {form.get.length < 1 ? 
            <div className={Css.gridC + "h-full"}>
                <EmptyData/>
            </div> :
            form.get.map((i, k) => 
                <div className="border-2 rounded-md bg-white" key={k}>
                    <div className="flex justify-between font-medium items-center p-3">
                        <p className="w-1/2 text-xl">{
                            i.name.slice(0, 15) + (i.name.length > 15 ? "...": "")
                        }</p>
                        <p className="text-white rounded-full tracking-wide bg-[royalblue] max-w-[60%] px-4 py-1">{
                            i.category.slice(0, 7) + (i.category.length > 7 ? "..." : "")
                        }</p>
                    </div>

                    <div className="text-xl p-4 bg-gray-100">
                        <div className="flex justify-between items-center mt-2">
                            <p>Quantity</p>
                            <p>{i.qty}</p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <p>Price</p>
                            <p>{Func.toCurrency(i.price)}</p>
                        </div>

                        <div className="flex justify-between items-center mt-2 font-bold">
                            <p>Total</p>
                            <p>{Func.toCurrency(i.qty * i.price)}</p>
                        </div>

                        <div className="flex w-full gap-2 text-white text-xl items-center mt-2">
                            <button 
                                className="flex bg-red-500 p-2 h-full w-[50%] rounded-md items-center" 
                                onClick={() => form.set(prev=>prev.filter((_, kTarget) => k !== kTarget) )}>
                                <span
                                    className={Css.icon }
                                    onClick={()=>{
                                        form.set(prev => prev.filter((_, kTarget)=> kTarget !== k))
                                    }}>delete</span>
                                <p className="ml-1 font-medium">Delete</p>
                            </button>

                            <button className="flex bg-yellow-400 p-2 h-full w-[50%] rounded-md" onClick={() => edit.set(i)}>
                                <span 
                                    className={Css.icon}
                                    onClick={()=>{
                                        edit.set(i)
                                        openForm(true)
                                    }}>edit</span>
                                <p className="ml-1 font-medium">Edit</p>
                            </button>
                        </div>
                    </div>

                </div>
            )}
    </div>
}