import { create } from "zustand";
type Step = "getInfo"| "acceptRules"
import SelectBox, { type Option } from "../components/panel/selectBox";


type AddOrderStore = {
    productId: string;
    count: string;
    rate: string;
    step : Step;
    products : Option[];
    isChecked : boolean;
    setProductId : (value : string)=>void;
    setCount : (value : string) => void;
    setRate : (value : string) => void;
    setStep : (value : Step) => void;
    setProducts : (value : Option[]) => void;
    setIsChecked : (value : boolean) => void

}

export const useAddOrderStore = create<AddOrderStore>()((set)=>({
    productId: "",
    count : "",
    rate : "",
    step : "getInfo", 
    products : [],
    isChecked : false,
    setProductId : (value) => set ({productId : value}),
    setCount : (value) => set({count:value}),
    setRate : (value) => set({rate:value}),
    setStep : (value) => set({step:value}),
    setProducts : (value) => set({products:value}),
    setIsChecked : (value) => set({isChecked : value})
}))

