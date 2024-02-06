import { RouterOnChangeArgs, route } from "preact-router"
import { Constants, Func, Types } from "./init"

type RouteChange = RouterOnChangeArgs<Record<string, string | undefined> | null>

export function auth() {
  return ({ url }: RouteChange) => {
    Func.patch("/auth/user")
      .then(()=> url === "/" || route("/control-panel", true))
      .catch(() => route("/user", true))
  } 
}

export function role() {
  return ({ url } : RouteChange) => {
    const role = url.split("/")[1]
    Func.patch(`/auth/role/${role}`)
      .catch(()=>route(`/401`, true))
  }
}