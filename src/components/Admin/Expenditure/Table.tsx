
import { useContext } from "react"
import { FormCtx } from "./Expenditure"

export default () => {
    const listForm = useContext(FormCtx)!
    return (<>
        {/* Table */}
        <div className="">
            <div className="flex w-full">
                <p className="w-1/4">Name</p>
                <p className="w-1/4">Quantity</p>
                <p className="w-1/4">Price</p>
            </div>

            {listForm.value.map((i)=>
                <div className="flex w-full">
                    <p className="w-1/3">{i.name}</p>
                    <p className="w-1/3">{i.descprint}</p>
                    <p className="w-1/3">{i.subTotal}</p>
                </div>
            )}
            <div className="flex w-full">
                <p className="w-2/3">Total</p>
                <p className="w-1/3">{listForm.value.reduce((prev, i)=>prev + i.subTotal, 0)}</p>
            </div>
        </div>
    </>)
}