import {z} from "zod"
export const addRepresentativeSchema = z.object({
    firstName:z.string().min(3,"حداقل سه کارکتر"),
          lastName:z.string().min(3,"حداقل سه کارکتر"),
          username:z.string().min(3,"حداقل سه کارکتر"),
          password:z.string().min(8,"حداقل 8 کارکتر باشد").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
    "رمز عبور باید شامل حروف کوچک و بزرگ، عدد و علامت خاص باشد"
  ),
          cellphone:z.string().length(11," باید 11 رقم باشد").regex(/^09\d{9}$/, "شماره همراه باید با 09 شروع شود"),
          idNo:z.string().length(10 ,"باید 10 رقم باشد"),
          confirmPassword:z.string().min(8,"تکرار رمز عبور با رمز عبور یکسان نیست")
})