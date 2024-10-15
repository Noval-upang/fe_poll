import { redirect } from "react-router-dom"
import { useMetaData } from "../../All/Selling"
import { DB } from "../../helpers/init"
import Detail from "./Detail"
import All from "./All"

export default () => {
   return <>
      <All/>
      <Detail/>
   </> 
}