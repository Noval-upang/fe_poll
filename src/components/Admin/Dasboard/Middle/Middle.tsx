import { Css } from '../../../helpers/init'
import LineG from './LineG'

export default () => {
    return (
        <div className="bg-white overflow-auto rounded-md mt-4 border p-2 md:w-[60%]">
            <div className="relative w-[150vw] md:w-full"> 
                <LineG/>                  
            </div>
        </div>
        
    )
}