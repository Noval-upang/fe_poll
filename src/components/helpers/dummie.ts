import { DB, Func } from "./init";

export namespace Dummie {
    export const 
        selling = [{
            date:`${Func.createDate()} ${Func.createTime()}`, 
            id:1, 
            id_worker:1, 
            pending:false,
            total: 12,
            list:JSON.stringify([{id:1, price:2000, qty:2}] as DB.SellingList[])
        },
        {
            date:`${Func.createDate()} ${Func.createTime()}`, 
            id:2, 
            id_worker:2, 
            pending:true,
            total:222,
            list:JSON.stringify([{id:1, price:2000, qty:2}] as DB.SellingList[])
        }] as DB.Selling[],

        product = [
            {
                category: "roti",
                id: 1,
                id_company: 1,
                name: "surya",
                price: 2000,
                qty: 100
            },
            {
                category: "roti",
                id: 2,
                id_company: 1,
                name: "swwwurya",
                price: 2000,
                qty: 100
            },
            {
                category: "ro2",
                id: 3,
                id_company: 1,
                name: "swwwurya",
                price: 2000,
                qty: 100
            }
        ] as DB.Product[],

        expenditure = [
            {
                date: `${Func.createDate(new Date(new Date().setDate(new Date().getDate() -1).toString()).toDateString())} ${Func.createTime()}`,
                id: 1,
                list: JSON.stringify([{todo:"DWDWwdw", descript:"", total: 100}] as DB.ExpList[]),
                total: 100
            },
            {
                date: `${Func.createDate()} ${Func.createTime()}`,
                id: 1,
                list: JSON.stringify([{todo:"DWDWwdw", descript:"", total: 100}] as DB.ExpList[]),
                total: 100
            },
            {
                date: `${Func.createDate()} ${Func.createTime()}`,
                id: 2,
                list: JSON.stringify([{todo:"DWDWdwdw", descript:undefined, total: 100}]),
                total: 100
                },
            {
                date: "1 January 2024 22:22",
                id: 1,
                list: JSON.stringify([{todo:"DWWDWDW", descript:"", total: 100}, {todo: "beli kecap", descript: undefined, total: 200}] as DB.ExpList[]),
                total: 300
            },
        ] as DB.Expenditure[],
        user = [
            {
                email: "dww@dwdw",
                name: "dwdw",
                id: 1
            },
            {
                email: "loffw@dwdw",
                name: "bonek",
                id: 2
            }
        ] as DB.User[],
        company = [
            {
                codeAccess: "2222",
                id: 1,
                id_user: 1,
                name: "daaddww"
            }
        ] as DB.Company[],
        workers = [
            {id: 1, id_company: 1,id_user:2}
        ] as DB.Workers[]
}