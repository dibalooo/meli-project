"use client"

type Option = { name: string; value: string };

export default function SelectBox({ lable, options, name, placeholder, onChange }: { lable: string, options: Option[], name: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div>
            <div className="pb-1">{lable}</div>
            <select name={name} onChange={onChange} className="text-gray-400 appearance-none w-60 h-8 outline-none border border-white rounded-lg pr-5 ">

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