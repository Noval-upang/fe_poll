import { useState } from "preact/hooks"
import { Func, DB } from "../helpers/init"

function Add({companyL}: {companyL:number}) {
   const 
      [form, setform] = useState({} as DB.Company),
      [action, setAction] = useState("Create"),
      [err, setErr] = useState(""),
      formElm = (display:"none"| "block") => 
         document.getElementById("form")!.style.display = display
      ,
      run = () => {
         Func
            .post(action === "Create" ? "/company_add" : "/worker_add", form)
            .then(()=>{
               formElm("none")
               setAction("Create")
            })
            .catch((e)=>setErr(Func.getResponse(e)))
      }
   return <>
      {/* Triggger */}
      <label className={`w-4/5`} for="form">
         +
      </label>
      {/* add */}
      <div className="hidden" id="form">
         <p className="px-2 py-3 bg-red-600 text-white font-medium text-xl">{err}</p>
         <input 
            type="text" 
            required 
            value={form.name} 
            onInput={(e)=>setform({...form, name:Func.getValue(e)})}/>
         <input 
            type="text" 
            required 
            value={form.codeAccess} 
            onInput={(e)=>setform({...form, codeAccess:Func.getValue(e)})}/>
         <button onClick={()=>run()}>{action}</button>
      </div>
   </>
}

function Show({company}: {company:DB.Company[]}) {
   return <>{company.map(i=>(<>
      <div className="flex">
         <span>icon</span>
         <p className="text-xl">{i.name}</p>
      </div>
   </>))}</>
}

export default function () {
   const [company, setCompany] = useState([] as DB.Company[])

   Func
      .get<DB.Company[]>("/auth/company_all")
      .then(res=>setCompany(res.data))

   return <div>
      <h1>Control Panel</h1>
      <Add companyL={company.length}/>
      {company.length > 0 && <Show company={company}/>}
   </div> 
}