'use client';
import { useEffect, useState } from 'react';
import DatePickerComponent from './DatePicker';
import SelectBox from './selectBox';
import PrimaryBtn from '../primary-btn';
import { useRouter } from 'next/navigation';
import { ChevronUp } from 'lucide-react';

type StatusModel = Record<string, string>;

export default function Filters({
	statusModel,
	setStatus,
	setProductId,
	getList,
	setFromDate,
	setToDate,
	pageNumber,
	setPageNumber,
	isLoading,
}: {
	statusModel: StatusModel;
	setStatus: any;
	setProductId: any;
	getList: () => void;
	setFromDate: (date: string | null) => void;
	setToDate: (date: string | null) => void;
	pageNumber: number;
	setPageNumber: (number: number) => void;
	isLoading?: boolean;
}) {
	const statusList = Object.keys(statusModel).map((key) => ({
		value: key,
		name: statusModel[key],
	}));
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const [isProductsLoading, setIsProductsLoading] = useState(false);
	async function requestProductList() {
		setIsProductsLoading(true);

		const fetching = fetch('http://37.32.24.124:443/api/v1/customer/products/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const response = await fetching;
		const bodyResponse = await response.json();

		if (response.ok && bodyResponse.success) {
			const products = bodyResponse.data.items.map((item: any) => ({
				name: item?.name,
				value: item?.id,
			}));
			setProducts(products);
		}
		if (response.status === 401) {
			router.push('/login');
			localStorage.removeItem('token');
			localStorage.removeItem('loginInfo');
		}
		if (response.status === 440) {
			const message = bodyResponse?.message;
			// confirm(message);
			if (confirm(message) == true) {
				router.push('/login');
				localStorage.removeItem('token');
				localStorage.removeItem('loginInfo');
			}
		}
		setIsProductsLoading(false);
	}
	useEffect(() => {
		requestProductList();
	}, []);

	return (
		<div className='flex justify-around items-end py-8  border-b border-white rounded-xl'>
			<div>
				<div className='pb-1'>از تاریخ</div>
				<DatePickerComponent onChange={(e: any) => setFromDate(e?.format())} className='bg-gray-50' />
			</div>
			<div>
				<div className='pb-1'>تا تاریخ</div>
				<DatePickerComponent onChange={(e: any) => setToDate(e?.format())} className='bg-gray-50' />
			</div>
			<div className='relative'>
				<SelectBox
					lable='وضعیت'
					options={statusList}
					onChange={(e) => setStatus(e?.target?.value)}
					name='status'
					placeholder='وضعیت سفارش را انتخاب کنید'
					className='border-none'
				/>
			</div>
			<div className='relative'>
				<SelectBox
					lable='ارز'
					options={products}
					onChange={(e) => setProductId(e.target.value)}
					name='currency'
					placeholder='ارز موردنظر را انتخاب کنید'
					className='border-none pl-5'
				/>
			</div>
			<PrimaryBtn
				disabled={isLoading}
				label='جست و جو'
				onClick={() => {
					pageNumber === 1 ? getList() : setPageNumber(1);
				}}
			/>
		</div>
	);
}
