export const AuthButton=({label, onClick}:{label:string, onClick?:React.MouseEventHandler<HTMLButtonElement>})=>{
    return <button onClick={onClick} className="w-full bg-slate-800 hover:bg-slate-900 rounded-md text-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </button>
}