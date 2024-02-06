import axios from "axios"
import { ComponentChildren } from "preact"

export namespace Constants {
   export const API = axios.create({baseURL:import.meta.env.API})
}

export namespace Func {
   export const 
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
      category:string
      qty:number
      price:number
   }

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
   }
}

export namespace Types {
   export type Props<T extends {} = {}> = T & {children : ComponentChildren}
   export type Cookie = {
      user:DB.User,
      expired: string
   }
}

export namespace Css {
   export const 
      gridC = "grid items-center "

}

export namespace Shared {
   export type Selling = {
      selling: DB.Selling[]
      product:DB.Product[]
   }
}