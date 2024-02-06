import { Css, Types } from "./init";


export default function ({children}:Types.Props) {
   return <>
      <div className={`${Css.gridC} w-full`}>
         <div className="w-3/4">
            {children}
         </div>
      </div>
   </> 
}