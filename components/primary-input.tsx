export default function PrimeryInput({value ,placeholder , onChange , className , lable, type="text"} : {value : string|number , placeholder : string , onChange : (e:React.ChangeEvent<HTMLInputElement>) => void , className? : string , lable:string ,type:React.HTMLInputTypeAttribute}) {
    
    return (

        <div>
            <label>{lable}</label>
            <input  className={`shadow-md block text-center border border-[#211e72] rounded-lg outline-none p-2 w-full text-right ${className}`} placeholder={placeholder} value={value} onChange={onChange}  type={type}/>
            <div></div>



        </div >

    )
}        