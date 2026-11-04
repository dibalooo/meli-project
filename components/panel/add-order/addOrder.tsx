'use client';
import { useEffect, useState } from 'react';
import SelectBox, { type Option } from '../selectBox';
import { useRouter } from 'next/navigation';
import { useAddOrderStore } from '@/store/addOrderStore';
import ShowRules from './components/show-rules';
import GetInfo from './components/get-info';
import { addOrderSchema } from '@/schemas/schemas-add-order';

import PrimaryBtn from '@/components/primary-btn';
import { ChevronRightIcon, Undo2 } from 'lucide-react';

type Errors = {
	productId?: string;
	count?: string;
	rate?: string;
};

type AddOrder = {
	productId: string;
	count: string;
	rate: string;
};

export default function AddOrder() {
	const { productId, setProductId, count, setCount, rate, setRate, step, setStep, isChecked, setIsChecked, resetForm } =
		useAddOrderStore((state) => state);
	const [products, setProducts] = useState<Option[]>([]);
	const router = useRouter();
	const [errors, setErrors] = useState<Errors>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleValidation = () => {
		const result = addOrderSchema.safeParse({
			productId,
			count,
			rate,
		});
		if (result.success) {
			setErrors({});
			setStep('acceptRules');
		} else {
		}
	};

	const isFormValid = addOrderSchema.safeParse({
		productId,
		count,
		rate,
	}).success;

	async function createOrder() {
		setIsLoading(true);
		const req = fetch('http://37.32.24.124:443/api/v1/customer/orders/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({ productId, count, rate }),
		});
		const res = await req;
		const bodyRes = await res.json();

		if (res.ok && bodyRes.success) {
			router.push('/panel/orders');
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
		resetForm();
	}, []);

	return (
		<div className='w-full mt-20'>
			<div className='flex flex-col justify-between items-center '>
				<div className='shadow-md  p-5 rounded-2xl w-150 flex flex-col'>
					<div className='border-b mb-5 pb-3'>ثبت سفارش</div>
					<div className='flex items-center gap-3'>
						<span
							className={` text-white p-1  flex items-center justify-center rounded ${step === 'getInfo' ? 'bg-blue-950 w-8 h-8' : 'bg-blue-100 w-6 h-6'}`}
						>
							{step === 'getInfo' ? (
								1
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='800px'
									height='800px'
									viewBox='0 0 16 16'
									version='1.1'
									fill='none'
									stroke='#fefeff'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2.5'
								>
									<path d='m1.75 9.75 2.5 2.5m3.5-4 2.5-2.5m-4.5 4 2.5 2.5 6-6.5' />
								</svg>
							)}
						</span>
						<div>اطلاعات سفارش</div>
					</div>
					{step === 'getInfo' && <GetInfo />}
					<div className='flex items-center gap-3 py-5'>
						<span
							className={`text-white flex justify-center items-center px-1 text-center rounded ${step === 'acceptRules' ? 'bg-blue-950 w-8 h-8' : 'bg-blue-100 w-6 h-6'}`}
						>
							2
						</span>
						<div>پذیرش شیوه نامه</div>
					</div>
					{step === 'acceptRules' && <ShowRules />}

					<div className='flex gap-3 justify-end text-white pt-5'>
						<PrimaryBtn
							icon={Undo2}
							label={step === 'getInfo' ? 'بازگشت' : 'مرحله قبل'}
							classname='flex border rounded-lg items-center justify-center gap-2 w-30 h-10 bg-blue-950 cursor-pointer'
							onClick={() => {
								if (step === 'getInfo') {
									router.push('/panel/orders');
								} else {
									setStep('getInfo');
								}
							}}
						/>
						<PrimaryBtn
							disabled={step === 'getInfo' ? !isFormValid : !isChecked || isLoading}
							onClick={() => {
								if (step !== 'acceptRules') {
									handleValidation();
								} else if (isChecked) {
									createOrder();
								}
							}}
							classname={`flex border rounded-lg items-center justify-center gap-2 w-30 h-10 bg-blue-950 ${
								(step === 'getInfo' && !isFormValid) || (step === 'acceptRules' && !isChecked)
									? 'bg-gray-300 cursor-not-allowed'
									: 'bg-blue-950 cursor-pointer'
							}`}
							label={step === 'acceptRules' ? 'ثبت سفارش' : 'مرحله بعد'}
							icon={ChevronRightIcon}
						/>

						{step === 'acceptRules' && (
							<PrimaryBtn
								label='انصراف'
								onClick={() => router.push('/panel/orders')}
								classname='flex border rounded-lg items-center justify-center gap-2 w-30 h-10 bg-blue-950 cursor-pointer'
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}