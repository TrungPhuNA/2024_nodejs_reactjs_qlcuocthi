import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { USER_SERVICE } from "../../services/api.service.ts";
import { useDispatch } from "react-redux";
import { setField } from "../../services/helpers.service.ts";
import { STATUSES, USER_TYPE } from "../../services/constant.ts";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo.tsx";


const formData = {
	email: "",
	phone: "",
	name: "",
	avatar: "",
	address: "",
	type: "",
	status: "",
	username: "",
	password: "",
	cf_password: "",
}

// @ts-ignore
const FormCreateOrUpdateUser: React.FC = ({ open, setOpen, detail, ...props }: any) => {

	const cancelButtonRef = useRef(null)

	const dispatch = useDispatch();

	const [form, setForm]: any = useState({ ...formData });
	const [errorForm, setErroForm] = useState({ ...formData });



	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		let data = { ...form };
		let response = null;
		if (detail || detail != null) {
			response = await USER_SERVICE.update(detail.id, data);
		} else {
			response = await USER_SERVICE.store(data);
		}

		console.log('============ response: ', response);
		if (response.status != 'success') {
			alert("Có lỗi xảy ra, xin vui lòng thử lại");
		} else {
			setOpen(false);
			props.getDataList({ ...props.params })
		}
	};

	const resetForm = () => {
		setForm({ ...formData })
	}

	useEffect(() => {
		if (detail) {
			setForm({
				name: detail?.name || "",
				type: detail?.type || "",
				email: detail?.email || "",
				username: detail?.username || "",
				phone: detail?.phone || "",
				status: detail?.status || "",
				address: detail?.address || "",
			})
		}
	}, [open]);

	// @ts-ignore
	// @ts-ignore
	return (
		<Transition.Root show={open} as={Fragment} appear>
			<Dialog as="div" className="relative z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
				onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div
						className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="">
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title as="h3"
												className="text-base font-semibold leading-6 text-gray-900">
												{detail ? 'Cập nhật thành viên' : 'Thêm mới thành viên'}
											</Dialog.Title>
											<div className="mt-2">
												<form onSubmit={handleSubmit}>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Họ tên
														</label>
														<input
															type="text"
															value={form.name}
															placeholder="Enter your full name"
															onChange={(e) => {
																let value = e && e.target.value?.trim() || null
																setField(value, 'name', form, setForm)
															}}
															className={`w-full rounded-lg border 
															${errorForm.name != '' ? 'border-red' : 'border-stroke'}  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
														/>
														{errorForm.name != '' && <span className="text-red text-xl mt-3">{errorForm.name}</span>}
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Username
														</label>
														<input
															type="text"
															value={form.username}
															placeholder="Enter your user name"
															readOnly={detail ? true : false}
															onChange={(e) => {
																if (!detail) {
																	let value = e && e.target.value?.trim() || null
																	setField(value, 'username', form, setForm)
																}
															}}
															className={`w-full rounded-lg border 
															${errorForm.username != '' ? 'border-red' : 'border-stroke'}  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
														/>
														{errorForm.username != '' && <span className="text-red text-xl mt-3">{errorForm.username}</span>}
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Email
														</label>
														<input
															type="text"
															value={form.email}
															placeholder="Enter your user name"
															readOnly={detail ? true : false}
															onChange={(e) => {
																if (!detail) {
																	let value = e && e.target.value?.trim() || null
																	setField(value, 'email', form, setForm)
																}
															}}
															className={`w-full rounded-lg border 
															${errorForm.email != '' ? 'border-red' : 'border-stroke'}  bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
														/>
														{errorForm.email != '' && <span className="text-red text-xl mt-3">{errorForm.email}</span>}
													</div>
													{!detail && <div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Mật khẩu
														</label>
														<input
															type="password"
															value={form.password}
															onChange={(e) => {
																let value = e && e.target.value?.trim() || null
																setField(value, 'password', form, setForm)
															}}
															placeholder="6+ Characters, 1 Capital letter"
															className={`w-full rounded-lg border 
															${errorForm.password != '' ? 'border-red' : 'border-stroke'} 
															bg-transparent py-4 pl-6 pr-10 dark:text-white outline-none 
															focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
														/>
														{errorForm.password != '' && <span className="text-red text-xl mt-3">{errorForm.password}</span>}

													</div>}
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Số điện thoại
														</label>
														<input
															type="text"
															value={form.phone}
															placeholder="Enter your SĐT"
															onChange={(e) => {
																if (!detail) {
																	let value = e && e.target.value?.trim() || null
																	setField(value, 'phone', form, setForm)
																}
															}}
															className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
														/>
													</div>
													<div className="mb-4.5">
														<label
															className="mb-3 block text-sm font-medium text-black dark:text-white"
															htmlFor="address"
														>
															Địa chỉ
														</label>
														<div className="relative">
															<span className="absolute left-4.5 top-4">
																<svg
																	className="fill-current"
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<g opacity="0.8" clipPath="url(#clip0_88_10224)">
																		<path
																			fillRule="evenodd"
																			clipRule="evenodd"
																			d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
																			fill=""
																		/>
																		<path
																			fillRule="evenodd"
																			clipRule="evenodd"
																			d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
																			fill=""
																		/>
																	</g>
																	<defs>
																		<clipPath id="clip0_88_10224">
																			<rect width="20" height="20" fill="white" />
																		</clipPath>
																	</defs>
																</svg>
															</span>

															<textarea
																className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
																name="address"
																id="address"
																value={form.address}
																onChange={(e) => {
																	let value = e && e.target.value?.trim() || null
																	setField(value, 'address', form, setForm)
																}}
																rows={6}
																placeholder="Địa chỉ"
															></textarea>
														</div>
													</div>
													<div className="mb-4.5">
														<SelectGroupTwo
															labelName={'Cấp bậc'}
															options={USER_TYPE}
															key_obj={'type'}
															value={form.type}
															form={form}
															setForm={setForm}
														/>
													</div>
													<div className="mb-4.5">
														<SelectGroupTwo
															labelName={'Trạng thái'}
															options={STATUSES}
															key_obj={'status'}
															value={form.status}
															form={form}
															setForm={setForm}
														/>
													</div>
													<div
														className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
														<button
															type="submit"
															className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
														>
															Thêm mới
														</button>
														<button
															type="button"
															className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
															onClick={() => setOpen(false)}
															ref={cancelButtonRef}
														>
															Huỷ bỏ
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default FormCreateOrUpdateUser;
