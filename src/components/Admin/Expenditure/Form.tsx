import { useSignal } from "@preact/signals-react";
import { Form, FormCtx } from "./Expenditure";
import { Func } from "../../helpers/init";
import { useContext } from "react";

export default () => {
    const 
        form = useSignal({} as Form),
        listForm = useContext(FormCtx)!

    return <div className="hidden fixed h-screen w-screen bg-[rgb(0,0,0,0.5)]">
        <div className="p-2 bg-white flex flex-col shadow-md">
            <input type="text" value={form.value.name} onChange={e=>form.value = {...form.value, name:Func.getValue(e)}}  />
            
            <textarea value={form.value.descprint} onChange={e=>form.value = {...form.value, descprint:Func.getValue(e)}}  />

            <input type="number" value={form.value.subTotal} onChange={e=>form.value = {...form.value, subTotal:Func.getValue(e)}}  />

            <button onClick={()=>listForm.value = [...listForm.value, form.value]}></button>
        </div>
    </div>
}