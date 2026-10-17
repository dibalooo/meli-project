import {z} from "zod"

export const addOrderSchema = z.object({
    productId : z.string().min(1,"لطفا ارز را انتخاب کنید"),
    rate : z.coerce.number().min(1,"نرخ باید بیشتر از صفر باشد"),
    count : z.coerce.number().min(1,"تعدا باید بیشتر از صفر باشد")
})