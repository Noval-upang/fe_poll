import axios from "axios"
<<<<<<< HEAD

type GroupBy = "today" | "daily" | "monthly"|"year"

export namespace Constants {
   export const 
      Url = import.meta.env.VITE_API,
      API = axios.create({baseURL:"http://" + import.meta.env.VITE_API} ),
      Month = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"],
      AuthURL = `http://${Url}/auth`,
      CompanyURL = AuthURL + "/company",
      ICON = "material-symbols-outlined "
=======
import { ComponentChildren } from "preact"

export namespace Constants {
   export const API = axios.create({baseURL:import.meta.env.API})
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
}

export namespace Func {
   export const 
<<<<<<< HEAD
      setAuth = () => ({"Authorization": localStorage.getItem("token")}),

      post = function<T>(url:string, data:{}|{}[]) {
         return Constants.API.post<T>(url, data, {headers:{"Content-Type":"application/json", ...setAuth()}})
      },

      get = function<T>(url:string) {   
         return Constants.API.get<T>(url, {headers:setAuth()})
      },

      patch = (url:string, data: {}) =>
         Constants.API.patch(url,data, {headers:setAuth()})
      ,

      getValue = (e: any) => e.target.value ,

      getResponse = (e:any) => e.response.data,

      makeArray = (length:number) => Array.from(Array(length).keys()),

      createDate = (val?:string) => {
         const date = !val ? new Date(): new Date(val)

         return `${date.getDate()} ${date.toLocaleString(undefined, {month: "long"})} ${date.getFullYear()}`
      },
      
      createTime = (origin?: string) => {
         const 
            date = !origin ? new Date(): new Date(origin),
            min = date.getMinutes()

         return `${date.getHours()}:${min < 10 ? "0" : "" + min}`
      },

      groupByDate = function<T>(data: {date:string}[], groupBy:GroupBy) {
         return (
            // @ts-ignore
            Object.groupBy(data, (i)=>{
               const time = new Date(i.date)
               
               return (
                  groupBy === "daily" || groupBy === "today" ? createDate(i.date) 
                  : groupBy === "monthly" ? time.getMonth()
                  : time.getFullYear()
               )
            }) as {[key:string]: T[]}
         )
      },

      countTotal = (data : {total:number}[]) => data.reduce((prev, i)=>prev + i.total, 0) ,
      sumArr = function<T>(data: T[], call : (val: T) =>number) {
         return data.reduce((prev, i) => prev + call(i),0)
      },
      uniqueArr = (arr: any[]) =>
         arr.filter((i, k, arr)=> arr.indexOf(i) === k),
      
      toCurrency = (num:number) => {
         return num
            .toString()
            .split("")
            .reverse()
            .reduce((prev, i, k) => {
               if ((k % 3 === 0) && (k > 0)) return [...prev, ".", i]
               return [...prev, i]
            }, [] as string[])
            .reverse()
            .join("")
      },
      isPhone = () => 
         window.screen.width < 768,
      isIPad = () => 
         window.screen.width < 1024
      
   }
=======
      setAuth = () => ({"Authorization": localStorage.getItem("auth")}),
      post = function<T>(url:string, data:{}|{}[]) {
         return Constants.API.post<T>(url, data, {headers:{"Content-Type":"application/json", ...setAuth()}})
      },
      get = function<T>(url:string) {
         return Constants.API.get<T>(url, {headers:setAuth()})
      },
      patch = (url:string) =>
         Constants.API.patch(url, {headers:setAuth()})
      ,
      getValue = (e: any) => e.target.value ,
      getResponse = (e:any) => e.response.data

}

>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
export namespace DB {
   type ID = {id:number}

   export type User = ID & {
      name:string
      email:string
      password:string
   }

   export type Company = ID & {
      id_user:number
      name:string 
      codeAccess:string
   }

   export type Workers = ID & {
      id_user:number
      id_company:number
   }

   export type Product = ID & {
      id_company:number
      name:string
<<<<<<< HEAD
      qty: number
      category:string
      price:number
      desc:string
   }

   export type Selling = ID & {
      id_worker:number

      
      /**
       * id:number
       * qty:number
       * price:number`
      */
      list: string
      pending: boolean
      total:number
      date:string
   }

   export type SellingList = ID & {
=======
      category:string
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
      qty:number
      price:number
   }

<<<<<<< HEAD
   export type Expenditure = ID & {
      id_company:number
      /**
       * todo:string
       * descript:string
       * total:number
       */
      list: string
      total:number
      date:string
   }

   export type ExpList = {
      todo:string
      descript:string
      total:number
=======
   export type Selling = ID & {
      id_worker:number
      productList: string
      provit:number
      date:string
   }

   export type SellingList = {
      id:number
      qty:number
      price:number
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
   }
}

export namespace Types {
<<<<<<< HEAD
   export type Props<T extends {} = {}> = T & {children : React.ReactNode}
=======
   export type Props<T extends {} = {}> = T & {children : ComponentChildren}
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
   export type Cookie = {
      user:DB.User,
      expired: string
   }
<<<<<<< HEAD
   export type Setter<T> = React.Dispatch<React.SetStateAction<T>>
=======
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
}

export namespace Css {
   export const 
<<<<<<< HEAD
      gridC = "grid place-items-center ",
      icon = "material-symbols-outlined ",
      ColorSelected = "#3db788"
=======
      gridC = "grid items-center "

>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
}

export namespace Shared {
   export type Selling = {
      selling: DB.Selling[]
      product:DB.Product[]
   }
<<<<<<< HEAD
}
=======
}
>>>>>>> 992e7b7bb807183f890b69d20ef12a790b435379
