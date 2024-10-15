import { useEffect, useState } from "react";
import { Css, DB, Func, Types } from "../../helpers/init";
import { openForm } from "./Form";
import EmptyData from "../Dasboard/Shift/Detail/EmptyData";
import {FilterProp} from './Product'
import { Filter, showFilter } from "./Filter";
import { useParams } from "react-router-dom";
import { Search } from "../../All/Search/Search";

export type ActionProps = {
    product : DB.Product[], 
    filter:FilterProp,
    setFilter: Types.Setter<FilterProp>
}

export const
    Action = ({filter, product, setFilter}: ActionProps) => {  
        const 
            {id} = useParams(),
            [user, setUser]  = useState({} as DB.User),
            [company, setCompany]  = useState({} as DB.Company)
            

        useEffect(() => { 
            Func
                .get("/auth/user")
                .then(({data}) => setUser(data as DB.User))

            Func
                .get(`/auth/company/${id}`)
                .then(({data}) => setCompany(data as DB.Company))
        }, [])
        
        return <div className="relative flex justify-between p-3 shadow-md items-center">
            <div className="static md:relative w-[80%] md:w-[60%]"> 
                <Search filter={filter} setFilter={setFilter} product={product}/>
            </div>
            
            {(user.id === company.id_user) &&
                <div className={`${Css.gridC} h-12 w-12 rounded-sm bg-[#ffcc00] text-white text-center`}>
                    <button 
                        className={Css.icon}
                        onClick={()=>openForm(true)}>
                        add
                    </button>
                </div>
            }
  
            <Filter filter={filter} product={product} setFilter={setFilter}/> 
        </div>
    }