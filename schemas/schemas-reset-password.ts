import {z} from "zod"
export const resetPasswordSchema = z.object({
    currentPassword:z.string().min(8,"حداقل 8 کارکتر"),
    newPassword : z.string().min(12 , "حداقل 12 کارکتر باشد").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
    "رمز عبور باید شامل حروف کوچک و بزرگ، عدد و علامت خاص باشد"),
    confirmNewPassword:z.string().min(12,"تکرار رمز عبور جدید با رمز جدید یکسان نیست")
})