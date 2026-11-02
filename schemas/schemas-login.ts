import {z} from "zod"
export const loginSchema = z.object({
    username : z.string().min(3,"نام کاربری می‌تواند شامل حروف انگلیسی، اعداد و کاراکترهای -، _ و . باشد."),
    password : z.string().min(8,"رمز باید حداقل 8 کارکتر باشد"),
    captchaCode : z.string().length(6,"حتما 6 کارکتر باشد")

})