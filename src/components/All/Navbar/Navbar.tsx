import { useParams } from "react-router-dom"
import { Css } from "../../helpers/init"
import { useEffect, useState } from "react"


const 
   openMenu = (open: boolean) => {
      const elm = document.getElementById("menu")!.style
      if (open) {
         elm.transform = "translate(0, 100%)"
      } else {
         elm.transform = "translate(0, -100%)"
      }
   }

export default function () {
   const 
      [menuOpen, setMenuOpen ] = useState(false),
      param = useParams(),
      btnStyle = "p-3 text-center font-bold md:p-2 md:px-4",
      linkStyle = (pathname:string) =>(`
         ${btnStyle}
         ${("/" + (window.location.pathname.split("/")[3] ?? "")) === pathname && "bg-white rounded-md text-black"}
      `)

      useEffect(() => {
         if (window.screen.width < 768) openMenu(menuOpen)
      }, [menuOpen])

   
   return <>
      <div className="flex p-2 py-3 relative justify-between items-center bg-[#3db788] md:text-lg">
         <div className="flex">
            <img src="" alt="" />
            <h1 className="font-bold text-white">Poll</h1>
         </div>

         <button 
            className={`p-1 mr-2 bg-white ${Css.icon} rounded-md hover:rotate-180 hover:scale-[1] md:hidden`}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "close": "menu"}
         </button>

         <div 
            className="absolute transition-all duration-1000 bottom-0 -translate-y-full md:translate-y-0 z-10 left-0 md:static" id="menu">
            <div 
               className="
                  grid gap-3 p-2 w-screen bg-[#3db788] text-white 
                  md:p-0 md:grid-flow-col md:w-full md:gap-1">
               <a 
                  className={`${linkStyle("/")} flex items-center justify-center`}
                  href={`/company/${param.id}/`}>
                     <span className={`${Css.icon} mr-1`}>analytics</span>
                     Dasboard
               </a>

               <a 
                  className={`${linkStyle("/product")} flex items-center justify-center`}
                  href={`/company/${param.id}/product`}> 
                     <span className={`${Css.icon} mr-1`}>format_list_bulleted</span>
                     Product
               </a>

               <a 
                  className={`${linkStyle("/casier")} flex items-center justify-center`}
                  href={`/company/${param.id}/casier`}>
                     <span className={`${Css.icon} mr-1`}>add_shopping_cart</span>
                     Casier
               </a>
            
               <a 
                  className={`${btnStyle} flex items-center justify-center`}
                  href="/company">
                     <span className={`${Css.icon} mr-1`}>grid_view</span>
                     Control Panel
               </a>

            </div>
         </div>
      </div>
   </>
}