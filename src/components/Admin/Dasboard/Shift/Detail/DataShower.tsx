import { Icon } from "./helpers"

type Props = {
    name:string
    time: string
    total:number
    key:string
    
    pending?: boolean
    desc?:string
    onClick?: () => void
}

export default ({desc, name, total, time, pending, key, onClick}:Props) => (
    <div className={`flex items-center justify-between px-2 py-3 border-b ${!!onClick && "cursor-pointer"}`} key={key} onClick={onClick}>
        <div className={"w-full"}>
            <div className="flex justify-between">
                <p className="text-xl font-medium">{name}</p>
                <Icon iconName="schedule" value={time} color="text-[#1e90ff]" />
            </div>
            <div className="mt-1 ml-1">
                {desc && 
                    <p className="font-light text-lg mt-1">{desc}</p>
                }
                <div className="flex flex-col mt-2 gap-3">
                    
                    {pending !== undefined && 
                        <div className="flex items-center">
                            <span className={`w-4 h-4 rounded-full ${pending ? "bg-green-500" : "bg-yellow-300"}`}/>
                            <p className="ml-1">{pending ? "Success" : "Pending"}</p>
                        </div>
                    }

                    <Icon iconName="price_check" value={String(total)} color="text-[#ffd700]"/>
                </div>
            </div>
        </div>

    </div>
)