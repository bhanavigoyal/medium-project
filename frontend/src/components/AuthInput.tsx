type Props={
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string,
    type?: string,
    label: string,
    placeholder: string,
}

export const AuthInput:React.FC<Props>=({onChange, name,label, placeholder, type})=>{
    return <div className="font-semibold text-sm text-left py-2">
        {label}
        <input name={name} placeholder={placeholder} type={type||"text"} onChange={onChange} className="w-full py-3 pl-2 border rounded-md border-slate-200">
        </input>
    </div>
}