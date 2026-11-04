'use client';
import { useEffect, useState } from 'react';
import PrimeryInput from '../primary-input';
import { useRouter } from 'next/navigation';
import { ShieldUser, Undo2 } from 'lucide-react';
import { addRepresentativeSchema } from '@/schemas/schemas-add-representative';
import PrimaryBtn from '../primary-btn';
export default function AddRepresentative() {
	const router = useRouter();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		cellphone: '',
		idNo: '',
		confirmPassword: '',
	});
	function handleChange(event: React.ChangeEvent<HTMLInputElement>, key: keyof typeof formData) {
		const value = event.target.value;

		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	}
	function handleSubmit() {
		if (!isFormValid) return;

		createNewRepresentative();
	}
	const isFormValid =
		addRepresentativeSchema.safeParse(formData).success && formData.password === formData.confirmPassword;
	async function createNewRepresentative() {
		setIsLoading(true);
		const req = fetch('http://37.32.24.124:443/api/v1/customer/exchange-users/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				firstName: formData.firstName,
				lastName: formData.lastName,
				username: formData.username,
				password: formData.password,
				cellphone: Number(formData.cellphone),
				idNo: formData.idNo,
			}),
		});
		const res = await req;
		const bodyRes = await res.json();
		if (res.ok && bodyRes.success) {
			router.push('/panel/exchange-representative');
		}
		if (res.status === 401) {
			router.push('/login');
			localStorage.removeItem('token');
			localStorage.removeItem('loginInfo');
		}
		if (res.status === 440) {
			const message = bodyRes?.message;
			// confirm(message);
			if (confirm(message) == true) {
				router.push('/login');
				localStorage.removeItem('token');
				localStorage.removeItem('loginInfo');
			}
		}
		setIsLoading(false);
	}
	useEffect(() => {
		const result = addRepresentativeSchema.shape.firstName.safeParse(formData.firstName);
		const lastNameResult = addRepresentativeSchema.shape.lastName.safeParse(formData.lastName);
		const usernameResult = addRepresentativeSchema.shape.username.safeParse(formData.username);
		const passwordResult = addRepresentativeSchema.shape.password.safeParse(formData.password);
		const cellphoneResult = addRepresentativeSchema.shape.cellphone.safeParse(formData.cellphone);
		const idNoResult = addRepresentativeSchema.shape.idNo.safeParse(formData.idNo);
		const confirmPasswordResult = addRepresentativeSchema.shape.confirmPassword.safeParse(formData.confirmPassword);

		setErrors((prev) => ({
			...prev,
			firstName: result.success ? '' : result.error.issues[0].message,
		}));

		setErrors((prev) => ({
			...prev,
			lastName: lastNameResult.success ? '' : lastNameResult.error.issues[0].message,
		}));

		setErrors((prev) => ({
			...prev,
			username: usernameResult.success ? '' : usernameResult.error.issues[0].message,
		}));
		setErrors((prev) => ({
			...prev,
			password: passwordResult.success ? '' : passwordResult.error.issues[0].message,
		}));
		setErrors((prev) => ({
			...prev,
			cellphone: cellphoneResult.success ? '' : cellphoneResult.error.issues[0].message,
		}));
		setErrors((prev) => ({
			...prev,
			idNo: idNoResult.success ? '' : idNoResult.error.issues[0].message,
		}));
		setErrors((prev) => ({
			...prev,
			confirmPassword: confirmPasswordResult.success ? '' : confirmPasswordResult.error.issues[0].message,
		}));
	}, [formData.firstName, formData.lastName, formData.password, formData.cellphone, formData.idNo]);
	return (
		<div className='flex justify-center items-center w-full'>
			<div className='shadow-md rounded-xl p-8'>
				<div className='flex gap-5 pb-3'>
					<div>
						<PrimeryInput
							value={formData.firstName}
							onChange={(e) => handleChange(e, 'firstName')}
							type='text'
							lable='نام'
							className={`w-full border ${errors.firstName && formData.firstName && 'border-red-500'}
					</div>  && 'border-red-500'}`}
						/>
						{errors.firstName && formData.firstName && <p className='text-red-500 text-sm pt-2'>{errors.firstName}</p>}
					</div>
					<div>
						<PrimeryInput
							value={formData.lastName}
							onChange={(e) => handleChange(e, 'lastName')}
							type='text'
							lable='نام خانوادگی'
							className={`w-full border ${errors.lastName && formData.lastName && 'border-red-500'}`}
						/>
						{errors.lastName && formData.lastName && <p className='text-red-500 text-sm pt-2'>{errors.lastName}</p>}
					</div>
					<div>
						<PrimeryInput
							value={formData.username}
							onChange={(e) => handleChange(e, 'username')}
							type='text'
							lable='نام کاربری'
							className={`w-full border ${errors.username && formData.username && 'border-red-500'}`}
						/>
						{errors.username && formData.username && <p className='text-red-500 text-sm pt-2'>{errors.username}</p>}
					</div>
				</div>
				<div className='flex gap-5 pb-3'>
					<div>
						<PrimeryInput
							value={formData.cellphone}
							onChange={(e) => handleChange(e, 'cellphone')}
							type='text'
							lable='شماره همراه'
							className={`w-full border ${errors.cellphone && formData.cellphone && 'border-red-500'}`}
						/>
						{errors.cellphone && formData.cellphone && <p className='text-red-500 text-sm pt-2'>{errors.cellphone}</p>}
					</div>
					<div>
						<PrimeryInput
							value={formData.idNo}
							onChange={(e) => handleChange(e, 'idNo')}
							type='text'
							lable='کد ملی'
							className={`w-full border ${errors.idNo && formData.idNo && 'border-red-500'}`}
						/>
						{errors.idNo && formData.idNo && <p className='text-red-500 text-sm pt-2'>{errors.idNo}</p>}
					</div>
					<div>
						<PrimeryInput
							value={formData.password}
							onChange={(e) => handleChange(e, 'password')}
							type='password'
							lable='رمز عبور'
							className={`w-full border ${errors.password && formData.password && 'border-red-500'}`}
						/>
						{errors.password && formData.password && <p className='text-red-500 text-sm pt-2'>{errors.password}</p>}
					</div>
				</div>
				<div className=''>
					<PrimeryInput
						value={formData.confirmPassword}
						onChange={(e) => handleChange(e, 'confirmPassword')}
						type='password'
						lable='تکرار رمز عبور'
						className={` border ${errors.confirmPassword && formData.confirmPassword && 'border-red-500'}`}
					/>
					{errors.confirmPassword && formData.confirmPassword && (
						<p className='text-red-500 text-sm pt-2'>{errors.confirmPassword}</p>
					)}
				</div>

				<div className='flex justify-end gap-3'>
					<PrimaryBtn
						icon={ShieldUser}
						label='ایجاد نماینده'
						disabled={!isFormValid || isLoading}
						onClick={handleSubmit}
						classname={`flex items-center gap-1  rounded px-2 py-1 ${
							!isFormValid || isLoading
								? 'opacity-50 cursor-not-allowed bg-gray-400 text-black'
								: 'opacity-100 cursor-pointer bg-blue-950 text-white'
						}`}
					/>

					<PrimaryBtn
						label='بازگشت'
						icon={Undo2}
						onClick={() => router.back()}
						classname='flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1'
					/>
				</div>
			</div>
		</div>
	);
}
