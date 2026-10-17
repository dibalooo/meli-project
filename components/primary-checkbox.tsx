"use client"
export default function PrimaryCheckox({label,checked,onChange}:{label:string,checked:boolean,onChange:(value:boolean)=>void}) {
    return (
        <div className="flex items-center gap-3 py-3">
            <input type="checkbox"  checked={checked} onChange={()=>{onChange(!checked)}} className=" h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"/>
            <span>{label}</span>

        </div>
    )
}