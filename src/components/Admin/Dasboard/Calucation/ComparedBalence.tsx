import { Css } from "../../../helpers/init"
type Props = {
    totalSelling:number
    totalExp:number
    totalSellingYsrd:number
    totalExpYsrd:number
}

export const 
    openCompared = (open:boolean) => {
        const 
            elm = document.getElementById("comparad-balence") as HTMLDialogElement,
            closeElm = document.getElementById("close-dialog")!
        if(open) {
            elm.show() 
            closeElm.style.display = "block"
        }
        else {
            elm.close()
            closeElm.style.display = "none"
        }
    },
    ComparedBalence =  ({totalExp, totalExpYsrd, totalSelling, totalSellingYsrd}: Props) => {
        return (<>
            <dialog className="cursor-default" id="comparad-balence">
                <div className="absolute bottom-0 left-full border bg-white ml-4 w-80  rounded-md z-20">
                    <div className="shadow-md w-full p-2">
                        <p className="text-lg font-medium text-center">Belance</p>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="w-1/2 border-r-4 border-dotted">
                            <div className="text-center p-3">
                                <p className="font-medium">Today</p>
                                <p className="text-xl font-bold jost-font mt-2">{`$ ${totalSelling - totalExp}`}</p>
                            </div>


                            <div className="flex p-2 ">
                                <div className="w-1/2 text-center">
                                    <p className="font-medium text-sm jost-font">{`$ ${totalSelling}`}</p>
                                    <div className={Css.gridC + "mt-1"} title="Income">
                                        <div className="border-2 border-green-400 w-8 rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div className="w-1/2 text-center"> 
                                    <p className="font-medium text-sm jost-font">{`$ ${totalExp}`}</p>
                                    <div className={Css.gridC + "mt-1"} title="Spent">
                                        <div className="border-2 border-red-400 w-8 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center w-1/2">
                            <div className="text-center p-3">
                                <p className="font-medium">Yesterday</p>
                                <p className="text-xl font-bold jost-font mt-2">{`$ ${totalSellingYsrd - totalExpYsrd}`}</p>
                            </div>
                            <div className="flex p-2">
                                <div className="w-1/2 text-center border-r-2">
                                    
                                    <p className="font-medium text-sm jost-font">{`$ ${totalSellingYsrd}`}</p>
                                    <div className={Css.gridC + "mt-1"} title="Income">
                                        <div className="border-2 border-green-400 w-8 rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div className="w-1/2 text-center">
                                    <p className="font-medium text-sm jost-font">{`$ ${totalExpYsrd}`}</p>
                                    <div className={Css.gridC + "mt-1"} title="Spent">
                                        <div className="border-2 border-red-400 w-8 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

            <div 
                id="close-dialog"
                className="hidden w-screen h-screen left-0 top-0 fixed z-10" 
                onClick={() => openCompared(false)}/>
        </>)
}