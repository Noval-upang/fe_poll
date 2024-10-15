import { createContext, useEffect, useReducer, useState } from "react"
import { Constants, Css, DB, Func } from "../../helpers/init"
import {Form, openForm} from '../../All/Form/Form'
import { Action } from "./Action"
import { Dummie } from "../../helpers/dummie"
import { useLocation, useParams } from "react-router-dom"

import EmptyData from "../Dasboard/Shift/Detail/EmptyData"
import NextPage from "./NextPage"
import Loading from "../../All/Loading"
import Container from "../../helpers/Container"

export type FilterProp = {name:string, category:string[]}

export const 
    ProductInDBCtxt = createContext([] as DB.Product[])

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

export default () => {
    const 
        {id} = useParams(),
        {hash} = useLocation(),

        [edit, setEdit] = useState<DB.Product | undefined>(undefined),
        [filter, setFilter] = useState({name: "", category: []} as FilterProp),
        [err, setErr] = useState({} as Partial<DB.Product>),
        [reload, updatePage] = useReducer((prev) => prev +1, 0),
        [loading, setLoading] = useState(false),

        [filterData, setFilterData] = useState([] as DB.Product[]),
        
        // orginal data
        [productInDB, setProductInDB] = useState([] as DB.Product[]),
        [sellingInDB, setSellingInDB] = useState([] as DB.Selling[]), 

        
        next = () => {
            setLoading(true)
            updatePage()
            setTimeout(()=> setLoading(false),2000)
        },

        editPrdct = (data: DB.Product) => {
            Func
                .patch(`${Constants.CompanyURL}/${id}/product/${edit!.id}/update`, data)
                .then(next)

            return true
        },

        addPrdct = (data: DB.Product) => {
            setErr({})
            Func
                .post(`${Constants.CompanyURL}/${id}/product_add`, data)
                .then(next)
                .catch((res) => setErr(res.response.data))
            
            return Object.keys(err).length < 1
        },

        getSellingList = (id:number) => sellingInDB
            .map(i=> JSON.parse(i.list) as DB.SellingList[])
            .reduce((prev, i) => [...prev, ...i],[])
            .filter(i=> i.id === id),

        totalQtyHasBenSold = (id: number) => 
            getSellingList(id).reduce((prev, i)=>prev + i.qty , 0),

        totalProvit = (id: number) => 
            getSellingList(id).reduce((prev, i)=>prev + i.price * i.qty , 0)
        
    // feach from api    
    useEffect(() => {
        Func
            .get(`${Constants.CompanyURL}/${id}/product_all`)
            .then(res => {
                setProductInDB(res.data as DB.Product[])
                setFilterData(res.data as DB.Product[])
            })
    
        Func
            .get(`${Constants.CompanyURL}/${id}/selling_all`)
            .then(res => {
                setSellingInDB(res.data as DB.Selling[])
            })

    }, [reload])

    // filter data
    useEffect(()=> {
        const 
            letterFilter = groupingLetter(filter.name ?? ""),
            filterByName = filter.name.length > 0 ? 
                productInDB        
                    .filter(i=> {
                        const nameProductLetter = groupingLetter(i.name)
                        
                        return letterFilter.every(i => {
                            const arr = nameProductLetter.find(j=> j.char === i.char)
                            return arr && arr.length >= i.length
                        })
                    })
                    .sort((a, b)=> b.name.indexOf(filter.name) - a.name.indexOf(filter.name)) : productInDB,
                    
            filterByCategory = filter.category.length > 0 ? 
                filterByName.filter(i=> filter.category.includes(i.category)) : filterByName,

            sliceData = productInDB.length > 20 ?
                filterByCategory.slice(Number(hash) * 20 - 20, Number(hash) * 20) : filterByCategory

        setFilterData(sliceData)

    }, [JSON.stringify(filter)])
    

    return (
        <div className="relative">
            <Action filter={filter} product={productInDB} setFilter={setFilter}/>

            <Container>
                {loading ? 
                    <div className={Css.gridC + "h-screen"}>
                        <Loading />
                    </div> :
                    productInDB.length === 0 ? 
                        <div className={Css.gridC + "h-[70vh]"}>            
                            <EmptyData />
                        </div>:
                    (filterData.length === 0) && (filter.name && filter.category)? 
                        <div className={Css.gridC + "h-[70vh]"}>
                            <div className="text-center">
                                <span className={Css.icon + "text-8xl"}>question_mark</span>
                                <p className="text-2xl font-medium mt-3">Product not found</p>
                            </div>
                        </div> : 

                    <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-3 ">
                        {filterData.map((i, k) => <>
                            <div className="border-2" key={k}>
                                <div className="flex justify-between border-b bg-white">
                                    <p className="p-2">{i.name}</p>
                                    <div className="flex items-center">
                                        <div className={Css.gridC + "px-3 h-full bg-[royalblue] "}>
                                            <p className="text-white font-medium tracking-wide">{i.category}</p>
                                        </div>
                                        <button 
                                            className={Css.icon + "bg-yellow-400 px-2 text-lg h-full"}
                                            onClick={()=>{
                                                setEdit(i)
                                                openForm(true)
                                            }}>edit</button>
                                    </div>
                                </div>

                                <div className="p-3 bg-[#f5f5f5]">
                                    <div className="">
                                        <p className="font-medium">Quantity</p>
                                        <div className="mx-3 ">
                                            <div className="flex justify-between items-center">
                                                <p>Avalible</p>
                                                <p className="font-semibold">{i.qty}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p>Sold</p>
                                                <p className="font-semibold">{totalQtyHasBenSold(i.id)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="font-medium">Value</p>
                                        <div className="mx-3">
                                            <div className="flex justify-between items-center">
                                                <p>Price</p>
                                                <p className="font-semibold">{i.price}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p>Income</p>
                                                <p className="font-semibold">{totalProvit(i.id)}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </>)}
                    </div>
                }
            </Container>

            <Form 
                edit={edit} 
                setEdit={setEdit} 
                onSubmit={edit ? editPrdct : addPrdct}
                err={err}
                onClickName={()=>{}}
                title="Edit Product"/>
            {productInDB.length > 20 && <NextPage />}
            
        </div>
    )

}