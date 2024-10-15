import { Chart, registerables } from "chart.js"
import { useContext } from "react"
import { Bar, Line } from "react-chartjs-2"
import { Func, Constants } from "../../../helpers/init"
import { ExpenditureCtxt, SellingCtxt } from "../Dasboard"
import { Dummie } from "../../../helpers/dummie"

const mapping = (data: {[key:string]:{total:number}[]}) => 
    Object
        .entries(data)
        .reduce((prev, [date, i])=> {
            prev[date] = Func.countTotal(i)
            return prev
        }, {} as {[key:string]:number})

export default () => {
    Chart.register(...registerables)

    const 
        selling = useContext(SellingCtxt),
        expenditure = useContext(ExpenditureCtxt),

        // groupng data 
        sellingGroup = Func.groupByDate(selling, "monthly") as {[key:string] : {total:number}[]}, 
        expGroup = Func.groupByDate(expenditure, "monthly") as {[key:string] : {total:number}[]},

        // count all 
        countSelling = mapping(sellingGroup),
        countExp = mapping(expGroup),
        
        // month
        month = Func.makeArray(12)
    
    

    return <Line
        data={{
            labels: Constants.Month.map(i=>i.slice(0, 3)),
            
            datasets: [
                {
                    label: "Income",
                    data: month.map(i=>countExp[i] || (Math.random() * 100).toFixed()),
    
                    borderColor: "rgb(27 189 206)",
                    backgroundColor: "rgb(27 189 206 / 20%)",
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: "Spent",
                    data: month.map(i=>countSelling[i] || (Math.random() * 100).toFixed()),

                    borderColor: "rgb(252 0 54)",
                    backgroundColor: "rgb(252 0 54 / 20%)",
                    borderWidth: 3,
                    tension: 0.3
                    
                }
            ],
            
        }}

        options={{
            
            scales: {
                x: {
                    grid: {
                        lineWidth: 0,
                        tickWidth: 2,
                    }
                },
                y: {
                    
                    grid: {
                        lineWidth: 0,
                        
                        tickWidth: 2
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                    
                },
            },

            elements: {
                point:{
                    radius: 0
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
        }}  
    />
}
