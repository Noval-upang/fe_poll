import { useLocation, useParams } from "react-router-dom"
import { Constants, Css, Func } from "../../helpers/init"
import { Link } from "react-router-dom"

export default () => {
    const 
        buttonStyle = "p-2 rounded-md text-lg text-center font-medium border-2 hover:bg-blue-300 ",
        {hash} = useLocation(),
        {role, id} = useParams(),

        to = (route:number) => `${Constants.CompanyURL}/${role}/${id}/product#${route}`

    return <div className={Css.gridC + "py-4"}>
        <div className="flex items-end gap-2">
            <Link 
                className={Css.icon + buttonStyle}
                to={to(Number(hash) -1)}>arrow_back_ios</Link>

            {Number(hash) > 1 &&
                <>
                    <Link 
                        className={buttonStyle + "px-4"}
                        to={to(1)}>1</Link>
                    <p className="mr-2 font-bold text-lg">...</p>
                </>
            }
            
            {Func.makeArray(3).map(i=>
                <Link 
                    className={buttonStyle + "px-4"}
                    to={to(Number(hash) + 1 )}>{Number(hash) + (i + 1)}</Link>
            )}
            <Link 
                className={Css.icon + buttonStyle}
                to={to(Number(hash) + 1 )}>arrow_forward_ios</Link>
        </div>
    </div>
}