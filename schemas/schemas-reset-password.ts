import {z} from "zod"
export const resetPasswordSchema = z.object({
    currentPassword:z.string().min(12,"رمز عبور قغلی خود را وارد کنید"),
    newPassword : z.string().min(12 , "رمز عبور جدید حداقل 12 کارکتر باشد"),
    confirmNewPassword:z.string().min(12,"تکرار رمز عبور جدید الزامی است")
})