import { useContext, useEffect, useState } from "react"
import { ExpenditureCtxt, SellingCtxt } from "../Dasboard"
import { Css, DB, Func } from "../../../helpers/init"
import Detail, {DataSetter} from "./Detail/Detail"
import { Icon } from "./Detail/helpers"
import EmptyData from "./Detail/EmptyData"
import ListShift from "./ListShift"


const pickDate = () => {
    const elm = document.getElementById("datepicker") as HTMLInputElement
    elm.showPicker()
}

export default () => {
    const   
        selling = useContext(SellingCtxt),
        expenditure = useContext(ExpenditureCtxt),

        [filterData, setFilterData] = useState(undefined as DataSetter),
        [filter, setFilter] = useState<string>(),
        
        
        // grouping by date
        sellingGroup = Func.groupByDate(selling, "daily") as Record<string, DB.Selling[]>,
        expenditureGroup = Func.groupByDate(expenditure, "daily") as Record<string, DB.Expenditure[]>,
        
        calculateLengthLoop = !!filter ? [filter] : Object
            .keys({...sellingGroup, ...expenditureGroup})

            // unique val
            .filter((i, k , arr) => arr.indexOf(i) === k)
            .map(i=> Func.createDate(i))
            
            // @ts-ignore
            .sort((a, b)=>new Date(a) - new Date(b))
                
        useEffect(()=> {
            const elm = document.getElementById("detail") as HTMLDialogElement
            filterData === undefined ? elm.close() : elm.showModal()
            
        },[JSON.stringify(filterData)])
        

    return (
        <div className="mt-3">
            <p className=" mx-2 font-bold tex`t-xl">Shift</p>

            <div className="w-[60%] grid grid-cols-[90%_10%] mt-4">
                <button 
                    className={`flex items-center p-2 w-full relative border bg-white ${filter ? "rounded-l-md":"rounded-md"}`}
                    onClick={pickDate}
                    >

                    <span className={Css.icon + "text-2xl mr-2"}>search</span>
                    <p>{!filter ? "Unset" : Func.createDate(filter)}</p>
                    
                    <input 
                        type="date" 
                        id="datepicker" 
                        className="absolute left-0 invisible" 
                        onChange={(e) => setFilter(Func.createDate(e.target.value))}/>
                </button>

                {filter && 
                    <button 
                        className={Css.icon + "bg-red-600 text-white text-2xl rounded-r-md"}
                        onClick={()=>setFilter(undefined)}>
                        close
                    </button>
                }
            </div>
                     

            <div className="h-[80vh] overflow-auto mt-2">
                {
                    Object.values(sellingGroup).length < 1 && 
                    Object.values(expenditureGroup).length < 1 ? 
                        <div className={Css.gridC + "h-full"}>
                            <EmptyData />
                        </div> :

                    filter && Object.values(sellingGroup[filter] ?? []).length < 1 && Object.values(expenditureGroup[filter] ?? []).length < 1 ? 
                        <div className={Css.gridC + "h-full"}>
                            <EmptyData />
                        </div> :

                    <ListShift 
                        expenditureGroup={expenditureGroup} 
                        sellingGroup={sellingGroup} 
                        listDate={calculateLengthLoop} 
                        setFilterData={setFilterData}
                    />
                }
                <Detail data={filterData} setData={setFilterData} />
            </div>
        </div> 
    )
}