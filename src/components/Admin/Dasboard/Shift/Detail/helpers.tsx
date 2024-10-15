import {   Css } from "../../../../helpers/init";

type IconProps = {iconName:string, value:string, color?:string}
type ShortProps = {origin:string, max:number, className:string}

export const 
    Icon = ({iconName, value, color}:IconProps) => <div className="flex items-center">
        <span className={Css.icon + (color ?? "text-black")}>{iconName}</span>
        <p className="ml-1">{value}</p>
    </div>,

    ShortWord = ({origin, max, className}: ShortProps) => {
        const 
            onClick = () => {
                const 
                    elm = document.getElementById("show-orgin"),
                    target = document.getElementById("target")
                
                elm!.style.display = "none"
                target!.innerHTML = origin
                
            }
            
        return <>
            {origin.length > max ? 
                <>
                    <p className={className}>{origin.slice(0, max)}</p>
                    <button 
                        type="button" 
                        id="show-orgin"
                        className="text-xl text-bold tracking-wider ml-2"
                        onClick={onClick}>...</button> 
                </> :
                <p className={className}>{origin}</p>}
        </>
        
    }
