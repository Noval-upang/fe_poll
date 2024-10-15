import { DB } from "../../helpers/init"

export type Props = {
   selling:DB.Selling[]
   product: DB.Product[]
   groupBy:string
}

export type SellingObject = {
   id:number
   name:string
   category:string
   qty:number
   total:number
}


export type ProductProp = Pick<SellingObject, "name"| "qty">
export type WorkersObject = {
   date:string 
   workerName:string 
   productList: ProductProp[]
   total:number
}