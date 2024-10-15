import { Css } from "./init";

export default function ({msg} : {msg?:string}) {
    return msg ? <div className="flex p-2 text-red-600 mt-1 items-center">
        <span className={Css.icon}>emergency_home</span>
        <p className="font-medium ml-2">{msg}</p>
    </div> : null
}