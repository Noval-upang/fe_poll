import { Css } from "../helpers/init"
import "../css/loading.css"

export default ({success}: {success?:boolean}) => (
    <div className={Css.gridC}>
        {success === undefined ? <>
            <div className="loading w-20 border-[10px] border-white border-x-blue-500 border-t-blue-500 rounded-full"></div> 
        </> :
        success ?
            <span className={Css.icon + "text-9xl text-green-400"}>check</span> :
            <span className={Css.icon + "text-9xl text-red-600"}>close`</span>
        }
    </div>
)