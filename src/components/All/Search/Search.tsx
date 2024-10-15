import { useState } from "react"
import { Css, DB, Func, Types } from "../../helpers/init"
import EmptyData from "../../Admin/Dasboard/Shift/Detail/EmptyData"
import {FilterCategory, openFilterCategory} from "./FilterCategory"


export type FilterProps = {
    name: string,
    category: string[]
}

export type Props = {
    setFilter: Types.Setter<FilterProps>
    product: DB.Product[]
    filter: FilterProps
}

export const 
    showFilter = (show:boolean) => {
        const elm = document.getElementById("filter-category")!.style
        show ? elm.display = "block" : elm.display = "none"
    },
    onEnter = (e:React.KeyboardEvent<HTMLInputElement>) => 
        e.code === "Enter" && openFilterCategory(false)
    ,
    
    Search = ({product, setFilter, filter} : Props) => {
        return <>
            <label className="flex p-2 rounded-sm border-2 border-blue-400" onClick={() => openFilterCategory(true)}>
                <div className={Css.gridC + "w-[10%] xl:w-[5%] "}>
                    <span className={Css.icon + "h-8 text-2xl"}>search</span>
                </div>

                <div className={Css.gridC + "w-[80%] xl:w-[90%]"}>
                    <input 
                        type="text" 
                        className="w-full text-xl outline-none px-1" 
                        placeholder="Search"
                        value={filter.name}
                        onKeyDown={onEnter}
                        onChange={(e) => setFilter(prev => ({...prev, name: e.target.value}))}/>
                </div>

                <div className={Css.gridC + `w-[10%] xl:w-[5%]  ${filter.category.length > 0 && "bg-[#1f85ff]"}`}>
                    <span className={Css.icon + `h-8 text-2xl ${filter.category.length > 0 && "text-white"}`}>tune</span>
                </div>
            </label>

            <FilterCategory product={product} setFilter={setFilter} filter={filter}/>
        </>
    }