import { Types } from "./init";


export default function ({children}:Types.Props) {
   return <>
      <div className={`w-full h-full md:grid place-items-center bg-[#e6e6e6]`}>
         <div className="w-full h-full xl:w-[95%] bg-[#f7f9ff] p-4">
            {children}
         </div>
      </div>
   </> 
}