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

const CompetitionsMe: React.FC = () => {

	const [open, setOpen] = useState(false)

	const triggerModalForm = () => {
		setOpen(!open);
	}

	const dispatch = useDispatch();

	const [dataList, setDataList] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [detail, setDetail] = useState(null);
	const [user] = useState(getItem('user'))



	const getDataList = async (filters: any) => {
		dispatch(toggleShowLoading(true));
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
		getDataList({ user_id: user.id, ...paging })
	}, []);

	return (
		<DefaultLayout>
			<Breadcrumb pageName="Quản lý cuộc thi của bạn" />
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
										Vòng thi
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
										File bài nộp
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Giám khảo
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Nhận xét
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Phản biện
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Đánh giá
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
											<p className="text-black dark:text-white">{packageItem?.round_number ? 'Vòng ' + packageItem.round_number : 'Vòng 1'}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{packageItem.point}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.status == 'FAIL' ? 'Loại' : (packageItem?.status == 'PASS' ? 'Hoàn thành' : ((packageItem?.status == 'PENDING' || !packageItem?.status) ? 'Chờ chấm' : 'Đang chấm'))}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">
												{formatTime(packageItem.created_at, 'DD/MM/yyyy')}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.file &&
												<a className="text-sky-500 dark:text-white " href={buildFile(packageItem?.file)} target={'_blank'}>
													{buildFile(packageItem?.file)}
												</a>}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<ul>
												<li className='text-nowrap'>
													{packageItem?.user_comment && <p>	Nhận xét:<b>{packageItem?.user_comment}</b></p>}
												</li>
												<li className='text-nowrap'>
													{packageItem?.user_argue && <p>	Phản biện: <b>{packageItem?.user_argue}</b></p>}
												</li>
												<li className='text-nowrap'>
													{packageItem?.user_point && <p>Đánh giá: <b>{packageItem?.user_point}</b></p>}
												</li>
											</ul>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.comment}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.argue}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.content}
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

export default CompetitionsMe;
