import {   Css } from "../../../../helpers/init";

export default () => (
    <div className={Css.gridC + "h-full"}>

        <div className="flex flex-col items-center">
            <span className={Css.icon + "text-[3rem] text-red-600"}>close</span>
            <span className={Css.icon + "text-[5rem] mt-[-0.5rem]"}>inbox</span>

            <p className="text-xl font-light mt-5">No data to show</p>
        </div>
    </div>
)