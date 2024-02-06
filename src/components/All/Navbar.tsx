export default function ({ role }: { role:string }) {
   
   return <div className="flex p-2">
      <div className="flex w-[40%]">
         <img src="" alt="" />
         <h1 className="font-bold">Poll</h1>
      </div>

      <button 
         className="p-2 bg-white"
         type="button">
         menu
      </button>

      <div className="flex absolute bottom-0 md:static md:flex-row" id="menu">
         {/* only admin */}
         {role === "admin" ? 
            <a 
               className=""
               href={`/${role}/dasboard`}
               >Dasboard</a> : null }
         <a 
            className=""
            href={`/${role}/sold`}
            >Sold</a>
            
         {/* only admin */}
         {role === "admin" ? 
            <a 
               className=""
               href={`/${role}/add`}
               >Add Product</a> : null }
         <a 
            className=""
            href={`/${role}/casier`}
            >Casier</a>
      </div>
   </div>
}