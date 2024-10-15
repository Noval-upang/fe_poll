export function ErrorMsg({msg}: { msg?: string }) {
   return msg ? <p className="text-red-500 text-medium">{msg}</p> : null
}