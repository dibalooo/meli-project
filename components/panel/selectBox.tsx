"use client"

export type Option = { name: string; value: string };

export default function SelectBox({ lable, options, name, placeholder, onChange , className,value }: { lable: string, options: Option[], name: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void , className? :string ,value?:string}) {
    return (
        <div>
            <div className="pb-1">{lable}</div>
            <select value={value} name={name} onChange={onChange} className={`text-gray-400 appearance-none  h-8 outline-none border border-gray bg-gray-50 rounded-lg pr-5 w-full ${className}`}>

                <option value=""  hidden>{placeholder}</option>
                {options.map((item, i) => (
                    <option key={i} value={item?.value}>
                        {item?.name}
                    </option>
                ))}

            </select>

        </div>
    )
}