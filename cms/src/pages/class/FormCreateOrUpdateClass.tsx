import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { CLASS_SERVICE, COMMON_SERVICE, SCHOOL_SERVICE, USER_SERVICE } from "../../services/api.service.ts";
import { INIT_PAGING, STATUSES } from "../../services/constant.ts";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo.tsx";
import { setField } from "../../services/helpers.service.ts";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../hooks/redux/actions/common.tsx";


const formData: any = {
	name: "",
	school_id: "",
	status: "",
	unit: ""
}
// @ts-ignore
const FormCreateOrUpdateClass: React.FC = ({ open, setOpen, detail, ...props }: any) => {

	const cancelButtonRef = useRef(null)
	const [dataList, setDataList] = useState([]);
	const [form, setForm] = useState({ ...formData });
	const [config, setConfig] = useState([]);
	const dispatch = useDispatch();


	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		let data = { ...form }
		let response = null;
		console.log('=============== detail: ', detail);
		dispatch(toggleShowLoading(true));
		if (detail || detail != null) {
			response = await CLASS_SERVICE.update(detail.id, data);
		} else {
			response = await CLASS_SERVICE.store(data);
		}
		dispatch(toggleShowLoading(false));


		console.log('============ response: ', response);
		if (response.status != 'success') {
			alert("Có lỗi xảy ra, xin vui lòng thử lại");
		} else {
			resetForm()
			setOpen(false);
			props.getDataList({ ...props.params })
		}
	};

	const resetForm = () => {
		setForm({ ...formData })
	};

	useEffect(() => {
		getSchoolLists({ page: 1, page_size: 1000 }).then(r => { });
		getConfig()
	}, [])

	useEffect(() => {

		if (detail) {
			setForm({
				name: detail?.name || "",
				school_id: detail?.school_id || "",
				status: detail?.status || "",
				unit: detail?.unit || ""
			})
		} else {
			resetForm()
		}
	}, [open]);

	const getSchoolLists = async (filters: any) => {
		const response: any = await SCHOOL_SERVICE.getList(filters);
		if (response?.status == 'success') {
			setDataList(response.data.result || []);
		}
	}

	const getConfig = async () => {
		const response: any = await COMMON_SERVICE.getConfig();
		if (response?.status == 'success') {
			let unitData = response?.data?.UNIT?.reduce((newItem: any, item: any) => {
				if(item) {
					newItem.push({
						id: item.code || item.value,
						name: item.name
					})
				}
				return newItem;
			}, [])
			setConfig(unitData);
		}
	}

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
												Thêm mới lớp học
											</Dialog.Title>
											<div className="mt-2">
												<form onSubmit={handleSubmit} id="formData">
													<div className="mb-4.5">
														<label
															className="mb-2.5 block text-black dark:text-white">
															Tên lớp
														</label>
														<input
															type="name"
															value={form.name}
															onChange={e => {
																setField(e?.target?.value, 'name', form, setForm);
															}}
															placeholder="Tên lớp"
															className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
														/>
													</div>
													<div className="mb-4.5">
														<SelectGroupTwo
															labelName={'Chọn trường'}
															options={dataList}
															key_obj={'school_id'}
															value={form.school_id}
															form={form}
															setForm={setForm}
														/>
													</div>

													<div className="mb-4.5">
														<SelectGroupTwo
															labelName={'Chọn khối'}
															options={config}
															key_obj={'unit'}
															value={form.unit}
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
													
													<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
														<button
															type="submit"
															className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
														>
															{detail ? 'Cập nhật' : 'Thêm mới'}
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

export default FormCreateOrUpdateClass;
