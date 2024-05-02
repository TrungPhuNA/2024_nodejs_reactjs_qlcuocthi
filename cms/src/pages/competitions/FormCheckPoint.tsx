import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { COMPETITION_SERVICE, CRITERIA_SERVICE, RESULT_SERVICE, USER_SERVICE } from "../../services/api.service.ts";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../hooks/redux/actions/common.tsx";
import { buildFile, getItem, setField } from "../../services/helpers.service.ts";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo.tsx";
import { STATUSES } from "../../services/constant.ts";
import MultiSelect from "../../components/Forms/MultiSelect.tsx";
import { toast } from "react-toastify";

const formData: any = {
	content: "",
	point: "",
}
// @ts-ignore
const FormCheckPoint: React.FC = ({ open, setOpen, detail, ...props }) => {

	const cancelButtonRef = useRef(null);
	const dispatch = useDispatch();
	const [form, setForm] = useState({ ...formData });


	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		let data = { ...form };
		let response = null;
		data.judge_ids = data.judge_ids?.split(',')
		dispatch(toggleShowLoading(true));
		response = await RESULT_SERVICE.update(detail.id, data);
		dispatch(toggleShowLoading(false));

		console.log('============ response: ', response);
		if (response.status != 'success') {
			toast.error(response?.message || `${detail ? 'Chấm điểm thất bại' : 'Chấm điểm thất bại'}`);
		} else {
			toast.success(`${detail ? 'Chấm điểm thành công' : 'Chấm điểm thành công'}`);
			setOpen(false);
			props.getDataList({page: 1, page_size: 10})
		}
	};

	const resetForm = () => {
		setForm({ ...formData })
	};


	useEffect(() => {
		if (!detail) {
			resetForm()
		} else {
			setForm({
				point: detail?.point || '',
				content:detail?.content || ''
			})
		}
	}, [open]);
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
												<p className="mb-0">Chấm điểm</p>
											</Dialog.Title>
											<div className="mt-2">
												<form onSubmit={handleSubmit}>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Tên cuôc thi
														</label>
														<input
															type="text"
															value={detail?.competition?.name}
															readOnly={true}
															placeholder="Tên cuộc thi"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Tên thí sinh
														</label>
														<input
															type="text"
															value={detail?.user?.name}
															readOnly={true}
															placeholder="Tên thí sinh"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															File
														</label>
														{detail?.file &&
															<a className="text-sky-500 dark:text-white " href={buildFile(detail?.file)} target={'_blank'}>
																{buildFile(detail?.file)}
															</a>}
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Điểm số
														</label>
														<input
															type="text"
															value={form.point}
															onChange={e => {
																let value = e?.target?.value;
																if(value.match( /^[0-9]+\.?([0-9]+)?$/g )) {
																	setField(value, 'point', form, setForm);
																} else {
																	setField(form.point || '', 'point', form, setForm);
																}
															}}
															placeholder="Điểm"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													</div>
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Nhận xét
														</label>
														<textarea
															value={form.content}
															onChange={e => {
																setField(e?.target?.value, 'content', form, setForm);
															}}
															placeholder="Nội dung"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													</div>
													<div
														className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
														<button
															type="submit"
															className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
														>
															Chấm điểm
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

export default FormCheckPoint;
