import { Css, Func } from '../../helpers/init'
import EmptyData from '../Dasboard/Shift/Detail/EmptyData'
import { ActionProps } from './Action'

export const 
    showFilter = (show:boolean) => {
        const elm = document.getElementById("filter-category")!.style
        show ? elm.display = "block" : elm.display = "none"
    },
    Filter = ({filter, product, setFilter}: ActionProps) => {
        
        const getUniqueCtgry = Func.uniqueArr(product.map(i=>i.category)) as string[]
        return <div className="absolute hidden top-[110%] left-1/2 -translate-x-1/2" id="filter-category" onMouseLeave={() => showFilter(false)}>
            <div className="relative bg-white border-2 overflow-hidden rounded-md w-[90vw] h-[40vh]">
                <div className="flex justify-between items-center p-2 px-3 border-b">
                    <h1 className="font-medium text-lg">Category</h1>
                    <span 
                        onClick={()=>showFilter(false)}
                        className={Css.icon + "text-xl text-red-500"}>close</span>
                </div>
                    {getUniqueCtgry.length === 0 ? 
                        <div className={Css.gridC + "h-[80%]"}>
                            <EmptyData />
                        </div>
                    : getUniqueCtgry.map((i, k)=> 
                        <div className="p-3 grid grid-cols-2 gap-3">
                            <button 
                                className="flex text-lg items-center border-2 rounded-md px-2 p-1" 
                                key={k}
                                onClick={()=>
                                    setFilter(prev => {
                                        const 
                                            prevCategory = prev?.category ?? [],
                                            newCategory = prevCategory.includes(i) ? prevCategory.filter((j)=> j !== i) : [...prevCategory, i]
                                        return ({...prev, category: newCategory})
                                    })
                                }>
                                    <span className={Css.icon + "text-lg"}>{
                                        filter?.category?.includes(i) ? 
                                            "radio_button_checked" : 
                                            "radio_button_unchecked"
                                    }</span>
                                    <p className="ml-1">{i.slice(0, 8) + (i.length > 8 ? "..." : "")}</p>
                            </button>
                        </div>
                    )}
                </div>
        </div>
    }