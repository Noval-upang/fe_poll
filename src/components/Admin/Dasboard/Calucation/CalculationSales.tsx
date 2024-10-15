import { useState } from "react"
import { Css } from "../../../helpers/init"
import CalucationBox from "./CalucationBox"

export default () => {
    const 
        [showBy, setShowBy] = useState("today" as "today" | "monthly" | "year"),
        active = (target: string) => showBy === target && `text-white bg-[${Css.ColorSelected}]`,
        openFilterData =(open:boolean) => {
            const elm = document.getElementById("filter-data") as HTMLDialogElement
            open ? elm.show() : elm.close()
        }
    return (
        <div className="m-3 mt-4 md:w-[40%]">
            <div className=" bg-white border rounded-md p-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Belance</h1>

                    <div className="relative">
                        <div 
                            className={`px-3 py-1 rounded-full flex items-center border bg-gray-50 `}
                            onClick={() => openFilterData(true)}>
                                <span className={Css.icon}>keyboard_arrow_down</span>
                                <p className="font-medium">{showBy[0]!.toUpperCase() + showBy.slice(1)}</p>
                        </div>
                        <dialog id="filter-data" className="w-full">
                            <div 
                                className="flex flex-col gap-1 absolute top-[0.5rem] right-0 w-60 bg-white border text-lg rounded-md overflow-hidden z-10" 
                                onClick={() => openFilterData(false)}>
                                <button 
                                    onClick={() => setShowBy("today")}
                                    className={`p-2 px-4 text-left ${active("today")}`}>This Day</button>
                                <button 
                                    onClick={() => setShowBy("monthly")}
                                    className={`p-2 px-4 text-left ${active("monthly")}`}>This month</button>
                                <button 
                                    onClick={() => setShowBy("year")}
                                    className={`p-2 px-4 text-left ${active("year")}`}>This Year</button>
                            </div>
                            <div className="fixed w-screen h-screen left-0 top-0" onClick={() => openFilterData(false)}/>

                        </dialog>
                    </div>
                </div>


                <CalucationBox groupBy={showBy}/>
            </div>
        </div>
    )
}