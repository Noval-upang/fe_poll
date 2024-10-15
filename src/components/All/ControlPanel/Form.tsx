import { Css, DB, Func } from "../../helpers/init"
import ErrorMsg from "../../helpers/ErrorMsg"
import { useState } from "react"

export default function ({companyL}: {companyL:number}) {
    const 
        [form, setForm] = useState({} as DB.Company),
        [err, setErr] = useState({} as Partial<DB.Company & {errMsg:string}>),

        submitStyle = "px-3 py-[0.35rem] font-medium rounded-md ",
       
        formElm = () => { 
            const elm = document.getElementById("form")! as HTMLDialogElement
            elm.open ? elm.close() : elm.showModal()
        },
        run = (path:string) => () => 
            Func
                .post(path, {name: form.name,code_access: form.codeAccess}) 
                .catch((e)=>{
                    setErr(Func.getResponse(e))
                })

    return <>
        {/* Triggger */}
        <div className={companyL < 1 ? `${Css.gridC} h-[80vh]` : ""}>
            <button 
                className={`
                    ${companyL > 0 ? 
                        "ml-auto border-2 border-black rounded-md px-3 p-1": 
                        "w-full h-[70vh] md:w-4/6 md:h-4/6 text-6xl bg-[#e7e7e7] rounded-lg"} 
                    font-bold ${Css.gridC} mt-8`} 
                onClick={formElm}>
                + {companyL > 0 && "Add"}
            </button>
        </div>

        {/* add */} 
        <dialog id="form" className="w-4/5 md:w-3/5 backdrop:bg-[rgb(0,0,0,0.75)]">
            <div className="flex flex-col py-2 px-3">
                <div className="flex justify-between">
                    <p className="font-medium m-1 mb-2">Create or Join Company</p>
                    <button type="button" className="font-bold" onClick={formElm}>X</button>
                </div>

                <input 
                    type="text" 
                    required
                    className={`p-2 border mt-2 ${(err.name || err.errMsg) && "border-red-500"} `}
                    placeholder="Name"
                    value={form.name} 
                    onInput={(e)=>setForm(prev => ({...prev, name:Func.getValue(e)}))}/>

                <ErrorMsg msg={err.name}/>

                <input 
                    type="text" 
                    required
                    className={`p-2 border mt-2 ${(err.codeAccess || err.errMsg) && "border-red-500"} `}
                    placeholder="Code access"
                    value={form.codeAccess} 
                    onInput={(e)=>setForm(prev => ({...prev, codeAccess:Func.getValue(e)}))}/>
                
                <ErrorMsg msg={err.codeAccess ?? err.errMsg}/>

                

                <div className="flex justify-end ml-auto mt-4">
                    <button 
                        onClick={run("/auth/worker_join")} 
                        className={submitStyle + "bg-yellow-300"}>Join</button>

                    <button 
                        onClick={run("/auth/company_add")} 
                        className={submitStyle + "bg-green-600 text-white ml-2"}>Create</button>
                </div>
            </div>
        </dialog>
    </>
}