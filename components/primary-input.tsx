export default function PrimeryInput({ value, placeholder, onChange, className, lable, type = "text" }: { value: string | number, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string, lable: string, type: React.HTMLInputTypeAttribute }) {

    return (

        <div className="w-full">
            <label>{lable}</label>
            <input className={`shadow-md block border border-gray-100 bg-gray-50 rounded-lg outline-none p-2 text-right ${className}`} placeholder={placeholder} value={value} onChange={onChange} type={type} />
        </div >

    )
}        