import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import { COMPETITION_SERVICE, CRITERIA_SERVICE, USER_SERVICE } from "../../services/api.service.ts";
import { STATUSES } from "../../services/constant.ts";
import { getItem, setField } from "../../services/helpers.service.ts";
import { useDispatch } from 'react-redux';
import { toggleShowLoading } from '../../hooks/redux/actions/common.tsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo.tsx';
import MultiSelect from '../../components/Forms/MultiSelect.tsx';
import SelectMultipleAnt from '../../components/Forms/SelectGroup/SelectMultiple.tsx';
import CkeditorPage from '../../components/Forms/CkEditorPage.tsx';


const formData: any = {
	name: "",
	author_id: "",
	status: "",
	contents: "",
	// image: "",
	criteria_ids: [],
	judge_ids: ""
}
const CompetitionForm: React.FC = () => {


	const dispatch = useDispatch();
	const [form, setForm] = useState({ ...formData });
	const [detail, setDetail]: any = useState(null);
	const [dataList, setDataList] = useState([]);
	const [criteria, setCriteria] = useState([]);
	const [user] = useState(getItem('user'));

	const [content, setContent]: any = useState(null);


	const { id } = useParams();

	const navigate = useNavigate();


	const handleSubmit = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		let data = { ...form };
		data.author_id = user.id;
		data.contents = content;
		let response = null;
		if (data?.judge_ids) {
			data.judge_ids = data.judge_ids + ""
			data.judge_ids = data.judge_ids?.split(',')
		}
		dispatch(toggleShowLoading(true));
		if (detail || detail != null) {
			response = await COMPETITION_SERVICE.update(detail.id, data);
		} else {
			response = await COMPETITION_SERVICE.store(data);
		}
		dispatch(toggleShowLoading(false));

		console.log('============ response: ', response);
		if (response.status != 'success') {
			toast.error(response?.message || `${detail ? 'Cập nhật thất bại' : 'Tạo mới thất bại'}`);
		} else {
			toast.success(`${detail ? 'Cập nhật thành công' : 'Tạo mới thành công'}`);
			navigate('/competitions')
		}
	};
	useEffect(() => {
		getUserList();
		getCriteriaList();
	}, []);

	const resetForm = () => {
		setForm({ ...formData })
	};


	useEffect(() => {
		if (id) {
			getDetail(id);
		} else {
			resetForm();
			console.log(123123);
		}
	}, [id]);



	const getUserList = async () => {
		const response: any = await USER_SERVICE.getList({ page: 1, page_size: 1000, type: 'TEACHER' });
		if (response?.status == 'success') {
			setDataList(response.data.result || []);
		}
	}
	const getCriteriaList = async () => {
		const response: any = await CRITERIA_SERVICE.getList({ page: 1, page_size: 1000 });
		if (response?.status == 'success') {
			let data = response?.data?.result?.map((item: any) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			setCriteria(data || []);
		}
	}

	const getDetail = async (id: any) => {
		dispatch(toggleShowLoading(true));
		const response: any = await COMPETITION_SERVICE.show(id);
		dispatch(toggleShowLoading(false));
		if (response?.status == 'success') {
			let data = response.data;
			setDetail(data);
			setForm({
				name: data?.name || "",
				author_id: data?.author_id || user.id,
				status: data?.status || "",
				contents: data?.contents || null,
				criteria_ids: data?.criteria_ids || [],
				judge_ids: data?.judges?.length > 0 ? data?.judges[0]?.id : null,
			});
			setContent(data?.contents)
		}
	}

	return (
		<DefaultLayout>
			<Breadcrumb pageName={id ? 'Cập nhật cuộc thi' : `Tạo mới cuộc thi`} />
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className={'mb-3 flex justify-end'}>
						<Link to={'/competitions'}
							className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
						>
							Trở lại
						</Link>
					</div>
					<div className="mt-2">
						<form onSubmit={handleSubmit}>
							<div className="mb-4.5">
								<label
									className="mb-2.5 block text-black dark:text-white">
									Tên cuôc thi
								</label>
								<input
									type="text"
									value={form.name}
									onChange={e => {
										setField(e?.target?.value, 'name', form, setForm);
									}}
									placeholder="Họ tên"
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>
							<div className="mb-4.5">
								<CkeditorPage
									title={'Nội dung cuộc thi'}
									value={content}
									onChange={(e:any) => {
										setContent(e);
									}}
								/>
							</div>
							<div className="mb-4.5">
								<label
									className="mb-2.5 block text-black dark:text-white">
									Tiêu chí
								</label>
								{criteria?.length > 0 &&
									// <MultiSelect id="criteria_list"
									// 	title={'Tiêu chí'}
									// 	data={criteria}
									// 	form={form}
									// 	setForm={setForm}
									// 	placeholder='Chọn tiêu chí'
									// 	obj_key={'criteria_ids'}
									// 	value_data={form.criteria_ids}
									// />

									<SelectMultipleAnt
										title={'Tiêu chí'}
										data={criteria}
										mode='multiple'
										key_obj={'criteria_ids'}
										value={form.criteria_ids}
										form={form}
										setForm={setForm}
									/>
								}
							</div>
							<div className="mb-4.5">
								<SelectGroupTwo
									labelName={'Ban giám khảo'}
									options={dataList}
									key_obj={'judge_ids'}
									value={form.judge_ids}
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
									className="inline-flex items-center justify-center bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5 rounded-md cursor-pointer
									"
								>
									{id ? 'Cập nhật' : 'Thêm mới'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default CompetitionForm;
