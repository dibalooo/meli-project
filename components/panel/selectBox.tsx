"use client"
export default function SelectBox({lable,options,name,placeholder}:{lable:string,options:string[],name:string,placeholder:string}){
    return(
        <div>
            <div className="pb-1">{lable}</div>
            <select name={name} className="text-gray-400 appearance-none w-60 h-8 outline-none border border-white rounded-lg pr-5">
                <option  value="" disabled hidden>{placeholder}</option>
                {options.map((option)=>(
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>

        </div> 
    )
}