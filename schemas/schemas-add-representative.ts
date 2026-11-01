import {z} from "zod"
export const addRepresentativeSchema = z.object({
    firstName:z.string().min(1,"لطفا نام خود را وارد کنید"),
          lastName:z.string().min(1,"لطفا نام خانوادگی خود را وارد کنید"),
          username:z.string().min(1,"لطفا نام کاربری خود را وارد کنید"),
          password:z.string().min(1,"لطفا رمز عبور خود را وارد کنید"),
          cellphone:z.string().length(11,"شماره همراه حتما باید 11 رقم باشد"),
          idNo:z.string().length(10 ,"کدملی حتما باید 10 رقم باشد"),
          confirmPassword:z.string().min(1,"تکرار رمز عبور الزامی است")
})