import { Func, DB, Css } from "../../helpers/init"
import Form from "./Form"
import ListCompany from "./ListCompany"
import { useEffect, useState } from "react"

export type CompanyData = (DB.Company & {isAdmin:boolean})[] 

export default function () {
   const [company, setCompany] = useState<CompanyData>([])
   
   useEffect(() => {
      Func
         .get<DB.Company[]>("/auth/company_all")
         .then(async ({data})=>{
            const user = await Func.get<DB.User>("/auth/user")
            setCompany(!data ? [] :data.
               map(i=> ({
                  ...i, 
                  isAdmin: i.id_user === user.data.id
               })) as CompanyData
            )
         })
   }, [])

   return <div className={Css.gridC + "h-screen"}>
      <div className="w-[90%] h-[85vh]">
         <h1 className="text-center w-full text-2xl font-bold">Control Panel</h1>
         
         <Form companyL={company!.length}/>
         
         {company!.length > 0 && <ListCompany company={company!}/>}
      </div>
   </div> 
}