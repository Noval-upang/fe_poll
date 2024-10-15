import {  useSignal } from "@preact/signals-react"
import { useParams } from "react-router-dom"
import { createContext, useEffect, useState } from "react"

import Container from "../../helpers/Container"
import {   Constants, DB, Func } from "../../helpers/init"

import Middle from "./Middle/Middle"
import CalculationSales from "./Calucation/CalculationSales"
import Shift from "./Shift/Shift"
import { Dummie } from "../../helpers/dummie"

export const 
   SellingCtxt = createContext([] as DB.Selling[]),
   ExpenditureCtxt = createContext([] as DB.Expenditure[])

export default () => {
   const 
      { id} = useParams(),
      [selling, setSelling] = useState(Dummie.selling as DB.Selling[]),
      [expenditure, setExpenditure] = useState(Dummie.expenditure as DB.Expenditure[])

   // useEffect(() => {
   //    // feach
   //    Func
   //       .get(`${Constants.CompanyURL}/${id}/selling_all`)
   //       .then(res=>setSelling(res.data as DB.Selling[]))
   
   //    Func
   //       .get(`${Constants.CompanyURL}/${id}/expenditure_all`)
   //       .then(res=>setExpenditure(res.data as DB.Expenditure[]))
   // },[])
   
   

   return <Container>
      <SellingCtxt.Provider value={selling}>
         <ExpenditureCtxt.Provider value={expenditure}>
            <div className="flex flex-col md:flex-row">
               <Middle />
               <CalculationSales />
            </div>
            <Shift/>
         </ExpenditureCtxt.Provider>
      </SellingCtxt.Provider>
   </Container>
}