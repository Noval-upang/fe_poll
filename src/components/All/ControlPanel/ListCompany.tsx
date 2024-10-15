import { CompanyData } from "./ControlPanel"

export default function ({company}: {company:CompanyData}) {
    const 
       titleStyle = "w-fit border-b-2 border-black pb-1 ",
       companyStyle = "flex p-2 px-3 rounded-sm bg-gray-400",
       
       ownedC = company.filter(i=>i.isAdmin),
       justWorker = company.filter(i=>!i.isAdmin),

       listStyle = "mt-4 grid gap-3 grid-cols-2 md:grid-cols-6",
       linkCompny = (id:number) => `/company/${id}`
 
    return <>
    {ownedC.length > 0 && <>
        <h1 className={titleStyle}>Owned</h1>
        <div className={listStyle}>
            {ownedC.map(i=><>
                <a 
                    href={linkCompny(i.id)}
                    className={companyStyle}>
                    <span>icon</span>
                    <p className="text-lg ml-2">{i.name}</p>
                </a>
            </>)}
        </div></>
    }
        
    {justWorker.length > 0 && <>
        <h1 className={titleStyle + "mt-4"}>Work Here</h1>
        <div className={listStyle}>
            {justWorker.map(i=> <>
                <a 
                    href={linkCompny(i.id)}
                    className={companyStyle}>
                    <span>icon</span>
                    <div className="text-lg ml-2">{i.name}</div>                  
                </a>
            </>)}
        </div></>
    }</>
}