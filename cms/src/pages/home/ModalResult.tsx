import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../hooks/redux/actions/common.tsx";
import { getItem, setField } from "../../services/helpers.service.ts";
import { RESULT_SERVICE, SCHOOL_SERVICE, UPLOAD_SERVICE } from "../../services/api.service.ts";
import { toast } from "react-toastify";
import { Modal } from "antd";
import "antd/dist/reset.css";
const formData: any = {
	name: "",
	author_id: "",
	status: "",
	contents: "",
	// image: "",
	criteria_ids: [],
	judge_ids: []
}
// @ts-ignore
const ModalResult: React.FC = ({ open, setOpen, criteria, ...props }) => {

	const cancelButtonRef = useRef(null);
	const ref = useRef(null);
	const [files, setFiles] = useState([]);

	const dispatch = useDispatch();
	const [file, setFile] = useState(null);
	const [user] = useState(getItem('user'))


	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		if(!file) {
			toast.error(`Vui lòng chọn file dự thi`);
			return null;
		}
		dispatch(toggleShowLoading(true));
		const fileResponse = await UPLOAD_SERVICE.upload(file);
		if (fileResponse?.status == 'success') {
			let data: any = {
				file: fileResponse?.data?.filename,
				user_id: user.id,
				round_number: 1,
				status: 'PENDING',
				point: 0,
				competition_id: criteria.id
			};
			// let data.author_id = user.id;
			console.info("===========[] ===========[data] : ", data);
			let response = await RESULT_SERVICE.store(data);
			dispatch(toggleShowLoading(false));
			console.info("===========[] ===========[response] : ", response);
			if (response.status != 'success') {
				toast.error(response?.message || `Nộp bài thất bại`)
			} else {
				toast.success(`Nộp bài thành công`, {
					onClose: (() => {
						window.location.href = '/competitions-me';
					})
				})

			}


		} else {
			dispatch(toggleShowLoading(false));
			toast.error(fileResponse?.message || `Upload file thất bại`)
		}

	};

	const handleFile = async (event: any) => {
		console.info("===========[] ===========[event] : ", event.target.files);
		let fileData = event.target.files[0];
		console.info("===========[] ===========[event] : ", fileData);
		setFile(fileData);
	}


	useEffect(() => {
		if(open) {
			setFile(null)
		}
	}, [open]);

	console.log(file);


	// @ts-ignore
	// @ts-ignore
	return (
		// <Transition.Root show={open} as={Fragment} appear>
		// 	<Dialog as="div" className="relative z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
		// 		onClose={setOpen}>
		// 		<Transition.Child
		// 			as={Fragment}
		// 			enter="ease-out duration-300"
		// 			enterFrom="opacity-0"
		// 			enterTo="opacity-100"
		// 			leave="ease-in duration-200"
		// 			leaveFrom="opacity-100"
		// 			leaveTo="opacity-0"
		// 		>
		// 			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		// 		</Transition.Child>

		// 		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
		// 			<div
		// 				className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		// 				<Transition.Child
		// 					as={Fragment}
		// 					enter="ease-out duration-300"
		// 					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		// 					enterTo="opacity-100 translate-y-0 sm:scale-100"
		// 					leave="ease-in duration-200"
		// 					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
		// 					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		// 				>
		// 					<Dialog.Panel
		// 						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
		// 						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
		// 							<div className="">
		// 								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
		// 									<Dialog.Title as="h3"
		// 										className="text-base font-semibold leading-6 text-gray-900">
		// 										Nộp bài thi
		// 									</Dialog.Title>
		// 									<div className="mt-2">
		// 										<form onSubmit={handleSubmit}>
		// 											<div className="mb-4.5">
		// 												<label
		// 													className="mb-2.5 block text-black dark:text-white">
		// 													Upload file
		// 												</label>
		// 												<input
		// 													type="file"
		// 													onChange={handleFile}
		// 													className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
		// 												/>
		// 											</div>

		// 											<div
		// 												className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
		// 												<button
		// 													type="submit"
		// 													className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
		// 												>
		// 													Xác nhận
		// 												</button>
		// 												<button
		// 													type="button"
		// 													className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
		// 													onClick={() => setOpen(false)}
		// 													ref={cancelButtonRef}
		// 												>
		// 													Huỷ bỏ
		// 												</button>
		// 											</div>
		// 										</form>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</Dialog.Panel>
		// 				</Transition.Child>
		// 			</div>
		// 		</div>
		// 	</Dialog>
		// </Transition.Root>

		<Modal
			open={open}
			title={"Nộp bài thi"}
			width={800}
			footer={null}
			onCancel={() => { setOpen(false) }}
		>
			<h2 className="text-2xl py-3 text-center">{criteria?.name}</h2>

			<div className="mt-2">
				<form onSubmit={handleSubmit}>
					<div className="mb-4.5">
						<label
							className="mb-2.5 block text-black dark:text-white">
							Upload file
						</label>
						<input
							type="file"
							onChange={handleFile}
							className="w-full rounded border-[1.5px] 
							border-stroke bg-transparent py-3 px-5 text-black outline-none 
							transition focus:border-primary active:border-primary 
							disabled:cursor-default disabled:bg-whiter 
							dark:border-form-strokedark dark:bg-form-input 
							dark:text-white dark:focus:border-primary"
						/>
					</div>
					<div
						className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							type="submit"
							className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
						>
							Xác nhận
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

		</Modal>
	)
}

export default ModalResult;
