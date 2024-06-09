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
import { Modal } from "antd";
import "antd/dist/reset.css";

const formData: any = {
	content: "",
	point: "",
	comment: "",
	user_comment: "",
	user_content: "",
	argue: "",
	user_argue: "",
	user_point: "",
}
// @ts-ignore
const FormCheckPoint: React.FC = ({ open, setOpen, detail, ...props }: any) => {

	const cancelButtonRef = useRef(null);
	const dispatch = useDispatch();
	const [form, setForm] = useState({ ...formData });

	const [user, setUser] = useState(getItem('user'))

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		let response = null;
		let data = detail?.meta_data || [];
		let newMetaData = {...form, type: detail?.round_number};
		if(data?.length > 0) {
			let index = data?.findIndex((item: any) => Number(item?.type) == Number(detail?.round_number));
			if(index < 0) data.push(newMetaData);
			else data[index] = newMetaData;
		}  else {
			data.push(newMetaData);
		}

		if(((!form.comment || form.comment?.toString() == "") || (!form.argue || form.argue?.toString() == "")) && detail?.status == "PENDING") {
			toast.error(`Điền đầy đủ các trường thông tin`);
			return;
		}
		if((!form.point || form.point?.toString() == "") && detail?.status == "PROCESSING") {
			toast.error(`Điền đầy đủ các trường thông tin`);
			return;
		}
		dispatch(toggleShowLoading(true));
		response = await RESULT_SERVICE.update(detail.id, {
			meta_data: data, 
			round_number: detail?.round_number || 1,
			status: "PROCESSING",
			point: Number(form.point)
		});
		dispatch(toggleShowLoading(false));

		console.log('============ response: ', response);
		if (response?.status != 'success') {
			toast.error(response?.message || `${detail ? 'Chấm điểm thất bại' : 'Chấm điểm thất bại'}`);
		} else {
			toast.success(`${detail ? 'Chấm điểm thành công' : 'Chấm điểm thành công'}`);
			setOpen(false);
			props.getDataList({ ...props.params, page: 1, page_size: 10,  })
		}
	};

	const resetForm = () => {
		setForm({ ...formData })
	};


	useEffect(() => {
		if (!detail) {
			resetForm()
		} else {
			let metaData = detail?.meta_data?.find((item: any) => item.type == detail?.round_number);
			setForm({
				content: metaData?.content,
				point: metaData?.point,
				comment: metaData?.comment || "",
				user_comment: metaData?.user_comment || (props.typeAction == 'COMMENT' ? user.name : '') || "",
				user_content: metaData?.user_content || "",
				argue: metaData?.argue || "",
				user_argue: metaData?.user_argue || (props.typeAction == 'ARGUE' ? user.name : '') || "",
				user_point: metaData?.user_point || (props.typeAction == 'POINT' ? user.name : '') || "",
			})
		}
	}, [open]);
	return (
		<Modal
			open={open}
			title={"Cuộc thi"}
			width={800}
			footer={null}
			onCancel={() => {setOpen(false)}}
		>
			<h2 className="text-2xl py-3 text-center">{detail?.competition?.name}</h2>
			<div className="mt-2">
				<form onSubmit={handleSubmit}>
					
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
					{props.typeAction == 'POINT' ? <div className="mb-4.5">
						<label
							className="mb-2.5 block text-black dark:text-white">
							Điểm số
						</label>
						<input
							type="number"
							value={form.point}
							min={0}
							onChange={e => {
								let value = e?.target?.value;
								if (value.match(/^[0-9]+\.?([0-9]+)?$/g)) {
									setField(value, 'point', form, setForm);
								} else {
									setField(form.point || '', 'point', form, setForm);
								}
							}}
							placeholder="Điểm"
							className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
						/>
					</div> : ''}
					<div className="mb-4.5">
						<label
							className="mb-2.5 block text-black dark:text-white">
							Đánh giá
						</label>
						<textarea
							value={form.comment}
							onChange={e => {
								setField(e?.target?.value, 'comment', form, setForm);
							}}
							placeholder="Nội dung"
							className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
						/>
					</div>
					<div className="mb-4.5">
						<label
							className="mb-2.5 block text-black dark:text-white">
							Phản biện
						</label>
						<textarea
							value={form.argue}
							onChange={e => {
								setField(e?.target?.value, 'argue', form, setForm);
							}}
							placeholder="Nội dung"
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
							Cập nhật
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
      </Modal >
	)
}

export default FormCheckPoint;
