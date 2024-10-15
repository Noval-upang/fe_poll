import { useContext, useEffect, useState } from "react"
import { Constants, Css, DB, Func } from "../../../helpers/init"
import { ExpenditureCtxt, SellingCtxt } from "../Dasboard"
import { useParams } from "react-router-dom"
import { Dummie } from "../../../helpers/dummie"
import {ComparedBalence, openCompared} from './ComparedBalence'


type GroupBy = "today" | "daily" | "monthly"|"year"
type Props  = {
    groupBy: GroupBy
}

export default ({groupBy}: Props) => {
    const 
        selling = useContext(SellingCtxt)!,
        expenditure = useContext(ExpenditureCtxt)!,

        {id} = useParams(),
        [product, setProduct] = useState(Dummie.product as DB.Product[]),
        

        // grouping data
        groupingSales = Func.groupByDate<DB.Selling>(selling ?? [], groupBy) ,
        groupingExp = Func.groupByDate<DB.Expenditure>(expenditure ?? [], groupBy),
        

        findData = (data : Record<string, DB.Selling[] | DB.Expenditure[]>) => {
            const 
                date = new Date(),
                entriesData = Object.entries(data)
            return (
                groupBy === "today" ? 
                    entriesData.filter(([e]) => 
                        e === Func.createDate(date.toDateString())
                    ) :
                groupBy === "monthly" ?
                    entriesData.filter(([e]) => 
                        new Date(e).getMonth() === date.getMonth()
                    ) :

                    entriesData.filter(([e]) => 
                        new Date(e).getFullYear() === date.getFullYear()
                    ) 
            )
        },

        total = (data: Array<[string, DB.Selling[] | DB.Expenditure[]]>)  => 
            data.reduce((prev, [_, i]) => 
                prev + i.reduce((pre, j) => pre + j.total, 0), 
                0
            ),

        mostSoldProduct = (data: Array<[string, DB.Selling[]]>) => {
            const 
                mappingProduct = data
                    .reduce((prev, [_, i]) => [...prev, ...(i.map(j => JSON.parse(j.list)))], [] as DB.SellingList[][])
                    .reduce((prev, i) => [...prev, ...i], [] as DB.SellingList[])
                    .map((i:DB.SellingList)=> i.id),

                idProduct = Math.max(...mappingProduct)

            return product.find(i => i.id === idProduct)?.name ?? ""
            
        },

        findDataYesterday = (data : Record<string, DB.Selling[] | DB.Expenditure[]>) => {
            const 
                date = new Date(),
                yesterday = new Date(date.setDate(date.getDate() - 1)),
                entriesData = Object.entries(data)
                
            return (
                groupBy === "today" ? 
                    entriesData.filter(([e]) => 
                        e === Func.createDate(yesterday.toDateString())
                    ) :
                groupBy === "monthly" ?
                    entriesData.filter(([e]) => 
                        new Date(e).getMonth() === yesterday.getMonth()
                    ) :

                    entriesData.filter(([e]) =>
                        new Date(e).getFullYear() === new Date(e).getFullYear() -1
                    ) 
            )

        },

        totalSelling = total(findData(groupingSales)),
        totalExp = total(findData(groupingExp)),

        // data yesterday
        
        totalSellingYsrd = total(findDataYesterday(groupingSales)) ,
        totalExpYsrd = total(findDataYesterday(groupingExp)) ,

        totalYsrdMoreThenNow = (totalSellingYsrd - totalExpYsrd) > (totalSelling - totalExp),
        totalYsrdSameWithNow = (totalSellingYsrd - totalExpYsrd) === (totalSelling - totalExp)

        // useEffect(() => {
        //     Func
        //         .get(`${Constants.CompanyURL}/${id}/product_all`)
        //         .then(res => {
        //             setProduct(res.data as DB.Product[])
        //         })
        // },[])

    return <div className="mt-4">
        <div className="flex">
            <p className="text-4xl jost-font">{"$ " + String(totalSelling - totalExp)}</p> 
            
            <div className="relative mt-auto ml-2" >
                <span 
                    onClick={() => openCompared(true)}
                    className={`
                    text-3xl ${Css.icon} cursor-pointer 
                    ${
                        totalYsrdMoreThenNow ? 
                            "text-red-500" :
                        totalYsrdSameWithNow ? 
                            "text-yellow-500" : 
                            "text-green-500"
                    } `}>
                    {
                        totalYsrdMoreThenNow ? 
                            "trending_down" :
                        totalYsrdSameWithNow ? 
                            "trending_flat" : 
                            "trending_up"
                    }
                </span>

                {/* <ComparedBalence totalExp={totalExp} totalSelling={totalSelling} totalSellingYsrd={totalSellingYsrd} totalExpYsrd={totalExpYsrd}/> */}
            </div>

        </div>
        
        <div className="flex justify-between mt-5">
            <div className={"w-[25%]"}>
                <p className="text-lg text-gray-400">Income</p>
                <p className="text-xl font-medium jost-font">{"$ " + String(totalSelling)}</p>
            </div>

            <div className={"w-[25%]"}>
                <p className="text-lg text-gray-400">Spent</p>
                <p className="text-xl font-medium jost-font">{"$ " + String(totalExp)}</p>
            </div>

            <div className={" w-[50%]"}>
                <p className="text-lg text-gray-400">Most popular</p>
                {/* @ts-ignore */}
                <p className="text-xl font-medium jost-font">{mostSoldProduct(findData(groupingSales))}</p>
                
            </div>

        </div> 

    </div>
}
