import { DB, Css } from "../../../helpers/init"
import { DataSetter } from "./Detail/Detail"

type Props = {
    listDate : string[]
    sellingGroup: Record<string, DB.Selling[]>,
    expenditureGroup: Record<string, DB.Expenditure[]>,
    setFilterData : (data: DataSetter) => void
}

export default ({listDate, expenditureGroup, sellingGroup, setFilterData} : Props) => {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {listDate.map((i, k)=>{
            const 
                sellingList = sellingGroup[i] ?? [] ,
                expList = expenditureGroup[i] ?? [],

                sellingTotal = sellingList?.reduce((prev, i)=> prev + i.total, 0) || 0,
                expenditureTotal = expList?.reduce((prev, i)=> prev + i.total, 0) || 0,
                balance = sellingTotal - expenditureTotal,
                
                // singkat name
                date = new Date(i)
                        
            return <>
                <div 
                    className="flex items-center rounded-md gap-2 border overflow-hidden bg-white"
                    onClick={()=>
                        setFilterData({sell: sellingGroup[i] ?? [], exp: expenditureGroup[i] ?? []})
                    } 
                    key={k}>
                        <div className="flex w-full">
                            <div className="w-[70%] p-2">
                                <p className="font-bold">{`${date.getDay()} ${date.toLocaleString("default",{month: "long"})} ${date.getFullYear()}`}</p>

                                <div className="mt-2">
                                    <div className="flex gap-2">
                                        <p className="font-light">Income</p>
                                        <p className="font-medium text-[#61c2ff]">{sellingTotal}</p>
                                    </div>

                                    <div className="flex gap-2 ">
                                        <p className="font-light">Expenditure</p>
                                        <p className="font-medium text-[#ff6262]">{expenditureTotal}</p>
                                    </div>
                                </div>

                            </div>
                            <div className={`w-[30%] ${Css.gridC} ${balance < 0 ? "bg-[#ff6262]" : "bg-[#61c2ff]"}`}>
                                <div className="text-white text-center">
                                    <p className="text-xl font-medium">{balance.toLocaleString("en-ID", {
                                        notation: "compact",
                                        compactDisplay: "short"
                                    })}</p>
                                    <p className="">Balence</p>
                                </div>
                            </div>
                        </div>
                </div>            
            </>
        })}
    </div>
}