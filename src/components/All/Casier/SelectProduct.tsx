import { Css, DB, Func, Types } from '../../helpers/init'
import EmptyData from '../../Admin/Dasboard/Shift/Detail/EmptyData'
import { useContext, useEffect, useState } from 'react'
import { ProductCntxt } from './Casier'
import { Search, FilterProps } from '../Search/Search'
import { openForm } from './Form'

type Props = {
    setForm: Types.Setter<DB.Product>,
    product: DB.Product[]
}


const groupingLetter = (value: string) => {
    const 
        arrName = Func.makeArray(value.length).map(i=> value[i]),
        groupByLetter = Object
            .entries(
                // @ts-ignore
                Object.groupBy(arrName, i=> i) as {[key:string]: string[]}
            )
            .map(([i, v])=> ({char: i, length: v.length})) as {char:string, length:number}[]
    return groupByLetter
}

export const 
    openSelect = (open:boolean) => {
        const elm = document.getElementById("select-product")!
        open ? elm.style.display = "block" : elm.style.display = "none"
    },
    SelectProduct =  ({setForm, product}:Props) => {
        const 
            [filter, setFilter] = useState({category:[], name:""} as FilterProps),
            [dataToShow, setDataToShow] = useState([] as DB.Product[]),

            hover = (mouseOn:boolean,key:number) => {
                const elm = document.getElementById(`hover-[${key}]`)!
                mouseOn ? elm.style.border = "2px solid #6e92ff" : elm.style.border = "2px solid #e5e7eb"
            }
            
            
            useEffect(() => {
                const 
                    letterFilter = groupingLetter(filter.name ?? ""),
                    filterByCategory = filter.category.length > 0 ? 
                        product.filter(i=> filter.category.includes(i.category)) : product,
                    filterByName = filter.name.length > 0 ? 
                        filterByCategory        
                            .filter(i=> {
                                const nameProductLetter = groupingLetter(i.name)
                                
                                return letterFilter.every(i => {
                                    const arr = nameProductLetter.find(j=> j.char === i.char)
                                    return arr && arr.length >= i.length
                                })
                            })
                            .sort((a, b)=> b.name.indexOf(filter.name) - a.name.indexOf(filter.name)) : filterByCategory
                       
                
                setDataToShow(filterByName)
            }, [JSON.stringify([filter, product])])

        return <div 
            id="select-product" 
            className='
                hidden fixed top-0 left-0 z-20 
                md:static md:block'
            >
            <div className="w-screen bg-gray-300 md:w-full">
                <div className="p-2 border-b-2 bg-white relative">
                    <div className="flex justify-between">
                        <p className='py-2 px-3 text-xl font-medium'>Select Product</p>
                        <button 
                            className={Css.icon + "text-red-500 text-xl md:hidden"}
                            onClick={() => openSelect(false)}>close</button>
                    </div>
                    

                    <Search product={product} setFilter={setFilter} filter={filter} />
                </div>

                <div 
                    className="
                        grid grid-cols-1 h-screen overflow-auto mx-4 bg-white 
                        lg:grid-cols-3
                        md:p-2
                        md:gap-2 md:grid-cols-2
                        md:h-[60%] md:m-0 
                        "
                        
                    id='container-selected-product'>

                    {product.length < 1 ? 
                        <div className={Css.gridC + "h-full"}>
                            <EmptyData/>
                        </div> :
                        dataToShow.length < 1 ? 
                            <div className={Css.gridC + "h-[70vh]"}>
                                <div className="text-center">
                                    <span className={Css.icon + "text-8xl"}>question_mark</span>
                                    <p className="text-2xl font-medium mt-3">Product not found</p>
                                </div>
                            </div>  :
                        dataToShow.map((i, k)=> 
                            <button 
                                onClick={()=>{
                                    setForm({name: i.name, category: i.category, price: i.price} as DB.Product)
                                    if(window.screen.width < 768)
                                        openSelect(false)
                                    else 
                                        openForm(true)
                                }} 
                                id={`hover-[${k}]`}
                                type='button'
                                className='w-full border-b-2 md:rounded-md md:overflow-hidden md:border-2' 
                                onMouseEnter={() => hover(true,k)}
                                onMouseLeave={() => hover(false,k)}
                                >
                                <div className="grid grid-cols-[70%_30%] border-b">
                                    <p className={Css.gridC + "p-2 justify-start h-full font-medium tracking-wide"} >{i.name}</p>
                                    
                                    <p className={Css.gridC + "bg-[royalblue] h-full text-white font-semibold tracking-wide"}>{i.category.length > 5 ? i.category.slice(0, 5) + ".." : i.category}</p>
                                </div>

                                {/* Content */}
                                <div className="p-3 bg-[#f5f5f5]">
                                    <div className="mx-2">
                                        <div className="flex justify-between items-center">
                                            <p>Avalible</p>
                                            <p className="font-semibold">{i.qty}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p>Price</p>
                                            <p className="font-semibold">{i.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )}
                </div>
            </div>
        </div>
    }