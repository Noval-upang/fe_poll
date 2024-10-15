import { useState } from "react"
import EmptyData from "../../Admin/Dasboard/Shift/Detail/EmptyData"
import { Func, Css } from "../../helpers/init"
import { FilterProps, Props, showFilter } from "./Search"


export const 
    openFilterCategory = (open:boolean) => {
        const 
            filterSelector  = document.getElementById("filter-selector")!,
            filterShadow    = document.getElementById("filter-shadow")!

        if (open) {
            filterShadow.style.display = "block" 
            filterSelector.style.display = "block"
        } else {
            filterSelector.style.display = "none"
            filterShadow.style.display = "none"
        }
        
    },
    FilterCategory =  ({product, setFilter, filter} : Props) => {
        const 
            getUniqueCtgry = Func.uniqueArr(product.map(i=>i.category)) as string[]

            return <>
                <div 
                    className="absolute hidden top-full left-0 z-10 px-4 h-[40vh] shadow-md overflow-auto w-screen md:w-full bg-white" 
                    id="filter-selector"
                    >
                    <p className=" font-medium py-2 mt-2 border-b border-black">Category</p>

                    <div className="flex flex-col gap-2 mt-2">
                        {
                            getUniqueCtgry.map(i =><>
                                <button 
                                    className="flex justify-between items-center  p-2" 
                                    type="button" 
                                    onClick={() => 
                                        setFilter(prev => {
                                            const 
                                                newData = prev.category.includes(i) ? 
                                                    prev.category.filter(j => j !== i) : 
                                                    [...prev.category, i]

                                            return ({
                                                ...prev, 
                                                category: newData
                                            })
                                        }
                                    )}
                                >
                                    <p className="text-xl">{i}</p>
                                    {filter.category.includes(i) ? 
                                        <span className={Css.icon + "text-[#1f85ff] text-3xl"}>check_circle</span>
                                        : <span className={Css.icon + "text-[#1f85ff] text-3xl"}>radio_button_unchecked</span>}
                                </button>
                            </>)
                        }
                    </div>
                </div>

                <div
                    id="filter-shadow" 
                    className="absolute hidden h-screen w-screen top-full left-0 bg-[rgb(0,0,0,0.5)] md:fixed md:top-0 md:bg-transparent" 
                    onClick={() => openFilterCategory(false)}/>
            </>
    }