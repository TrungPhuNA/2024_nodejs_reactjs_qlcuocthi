import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import { COMPETITION_SERVICE, RESULT_SERVICE } from "../../services/api.service.ts";
import { INIT_PAGING } from "../../services/constant.ts";
import FormCreateOrUpdateCompetition from "../competitions/FormCreateOrUpdateCompetition.tsx";
import { buildFile, formatTime, getItem } from "../../services/helpers.service.ts";
import { useDispatch } from 'react-redux';
import { toggleShowLoading } from '../../hooks/redux/actions/common.tsx';
import { PagingPage } from '../../components/common/paging/PagingCpn.tsx';
import user from "../user/User.tsx";
import FormCheckPoint from './FormCheckPoint.tsx';
import { toast } from 'react-toastify';

const CompetitionsResult: React.FC = () => {

	const [open, setOpen] = useState(false);

	const triggerModalForm = () => {
		setOpen(!open);
	}

	const dispatch = useDispatch();

	const [dataList, setDataList] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [params, setParams] = useState({});
	const [detail, setDetail] = useState(null);
	const [typeAction, setTypeAction] = useState(null);
	const [title, setTitle] = useState("Chấm thi vòng 1");
	const [user] = useState(getItem('user'));


	const updateData = async (item: any, type: any) => {
		setOpen(!open);
		setDetail(item);
		setTypeAction(type)
	}

	const getDataList = async (filters: any) => {
		dispatch(toggleShowLoading(true));
		if (user?.type == 'TEACHER') {
			filters.judge_id = user.id
		}
		const response: any = await RESULT_SERVICE.getList(filters);
		dispatch(toggleShowLoading(false));

		if (response?.status == 'success') {
			let data = response.data.result?.map((item: any) => {
				if (item.meta_data?.length > 0) {
					let metaData = item.meta_data?.find((e: any) => e.type == item.round_number);
					let obj = {
						content: metaData?.content,
						point: metaData?.point,
						comment: metaData?.comment || "",
						user_comment: metaData?.user_comment,
						user_content: metaData?.user_content || "",
						argue: metaData?.argue || "",
						user_argue: metaData?.user_argue,
						user_point: metaData?.user_point,
					}
					return { ...item, ...obj }

				}
				return item;
			})
			setDataList(data || []);
			setPaging(response.data.meta || INIT_PAGING);
		}
	}

	useEffect(() => {
		if (!open) {
			setDetail(null)
		}
	}, [open]);

	useEffect(() => {
		let path = window.location.pathname;
		let param = params;
		if (path?.includes('round-two')) {
			setParams({ round_number: 2 });
			getDataList({ ...paging, round_number: 2 });
			setTitle("Chấm thi vòng 2")
		} else if (path?.includes('round-three')) {
			setParams({ round_number: 3 });
			getDataList({ ...paging, round_number: 3 });
			setTitle("Chấm thi vòng 3")
		} else {
			setParams({ round_number:1 });
			setTitle("Chấm thi vòng 1")
			getDataList({ ...paging, round_number: 1 });
		}

	}, [window.location.pathname]);

	const passData = async (item: any, status: any) => {
		const response = await RESULT_SERVICE.update(item.id, {
			status: item?.round_number == 3 ? status : (status == 'FAIL' ? status : "PENDING"),
			round_number: status == 'FAIL' ? (item.round_number || 1) : (item?.round_number == 3 ? item.round_number : (item?.round_number + 1))
		});
		if (response?.status == "success") {
			toast.success(`Cập nhật thành công`);
			getDataList({ ...paging, ...params })
		} else {
			toast.error(`Cập nhật thất bại`);
		}
	}

	return (
		<DefaultLayout>
			<Breadcrumb pageName={title} />
			<FormCheckPoint
				open={open} setOpen={setOpen}
				detail={detail} getDataList={getDataList} params={{ ...paging, ...params }} typeAction={typeAction} />
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
										Tên cuộc thi
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Người nộp
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Điểm
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Trạng thái
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Ngày nộp bài
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Giám khảo
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Nhận xét
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										File bài nộp
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{dataList.map((packageItem: any, key) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<h5 className="font-medium text-black dark:text-white cursor-pointer"
											>
												{packageItem?.competition?.name}
											</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{packageItem?.user?.name}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{packageItem.point}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.status == 'FAIL' ? 'Trượt' : (packageItem?.status == 'PASS' ? 'Hoàn thành' : ((packageItem?.status == 'PENDING' || !packageItem?.status) ? 'Chờ chấm' : 'Đang chấm'))}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">
												{formatTime(packageItem.created_at, 'DD/MM/yyyy')}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<ul>
												<li className='text-nowrap'>
													Nhận xét: <b>{packageItem?.user_comment}</b>
												</li>
												<li className='text-nowrap'>
													Phản biện: <b>{packageItem?.user_argue}</b>
												</li>
												<li className='text-nowrap'>
													Đánh giá: <b>{packageItem?.user_point}</b>
												</li>
											</ul>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<ul>
												<li>
													Nhận xét: <p className='ml-2'>{packageItem?.comment}</p>
												</li>
												<li>
													Phản biện: <p className='ml-2'>{packageItem?.argue}</p>
												</li>
												<li>
													Đánh giá: <p className='ml-2'>{packageItem?.content}</p>
												</li>
											</ul>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.file &&
												<a className="text-sky-500 dark:text-white " href={buildFile(packageItem?.file)} target={'_blank'}>
													{buildFile(packageItem?.file)}
												</a>}
										</td>
										<td className="py-5 px-4 dark:border-strokedark">
											{(packageItem?.status != 'PASS' && packageItem?.status != 'FAIL') &&
												<div className="md:grid md:grid-cols-2 md:gap-5 min-w-[200px] ">
													{(packageItem?.status != 'POINT') ? <>
														<a className=" flex  text-nowrap mx-2 min-w-[100px]
												justify-center bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 
												lg:px-5 xl:px-5 rounded-md cursor-pointer" onClick={() => updateData(packageItem, 'COMMENT')}>
															Đánh giá
														</a>
														<a className="  flex  text-nowrap mx-2  min-w-[100px]
												justify-center bg-warning py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 
												lg:px-5 xl:px-5 rounded-md cursor-pointer" onClick={() => updateData(packageItem, 'ARGUE')}>
															Phản biện
														</a>
													</> : ''}

													{(packageItem?.status == 'COMMENT' || packageItem?.status == 'ARGUE') ? <>
														<a className="flex text-nowrap mx-2  min-w-[100px]
												justify-center bg-sky-500 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 
												lg:px-5 xl:px-5 rounded-md cursor-pointer" onClick={() => updateData(packageItem, 'POINT')}>
															Chấm điểm
														</a>

													</> : ''}

													{packageItem?.status == 'POINT' ? <>
														<a className="flex text-nowrap mx-2  min-w-[100px]
												justify-center bg-success py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 
												lg:px-5 xl:px-5 rounded-md cursor-pointer" onClick={() => passData(packageItem, 'PASS')}>
															Qua vòng
														</a>
														<a className="flex text-nowrap mx-2  min-w-[100px]
												justify-center bg-red-500 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 
												lg:px-5 xl:px-5 rounded-md cursor-pointer" onClick={() => passData(packageItem, 'FAIL')}>
															Hủy
														</a>

													</> : ''}
												</div>}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="mt-3 py-5">
						<PagingPage paging={paging}
							setPaging={setPaging}
							onPageChange={(e: any) => {
								getDataList({ page: e, page_size: paging.page_size, ...params })
							}} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default CompetitionsResult;
