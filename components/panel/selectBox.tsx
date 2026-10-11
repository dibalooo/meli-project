"use client"
export default function SelectBox({ lable, options, name, placeholder ,onChange}: { lable: string, options: string[], name: string, placeholder: string, onChange:(e:React.ChangeEvent<HTMLSelectElement>) => void  }) {
    return (
        <div>
            <div className="pb-1">{lable}</div>
            <select name={name} onChange={onChange} className="text-gray-400 appearance-none w-60 h-8 outline-none border border-white rounded-lg pr-5 ">
                
                <option value="" disabled hidden>{placeholder}</option>
                {Object.entries(options).map(([key, value]) => (
                    <option key={key} value={value}>
                        {value}
                    </option>
                ))}
                
            </select>

        </div>
    )
}