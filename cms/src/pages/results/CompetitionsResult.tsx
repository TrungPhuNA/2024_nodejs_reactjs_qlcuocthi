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

const CompetitionsResult: React.FC = () => {

	const [open, setOpen] = useState(false)

	const triggerModalForm = () => {
		setOpen(!open);
	}

	const dispatch = useDispatch();

	const [dataList, setDataList] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [detail, setDetail] = useState(null);
	const [user] = useState(getItem('user'))

	const updateData = async (item: any) => {
		setOpen(!open);
		setDetail(item);
	}

	const getDataList = async (filters: any) => {
		dispatch(toggleShowLoading(true));
		if (user?.type == 'TEACHER') {
			filters.judge_id = user.id
		}
		const response: any = await RESULT_SERVICE.getList(filters);
		dispatch(toggleShowLoading(false));

		if (response?.status == 'success') {
			setDataList(response.data.result || []);
			setPaging(response.data.meta || INIT_PAGING);
		}
	}

	useEffect(() => {
		if (!open) {
			setDetail(null)
		}
	}, [open]);

	useEffect(() => {
		getDataList({ ...paging })
	}, []);

	return (
		<DefaultLayout>
			<Breadcrumb pageName="Quản lý cuộc thi của bạn" />
			<FormCheckPoint
				open={open} setOpen={setOpen}
				detail={detail} getDataList={getDataList} params={paging} />
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
										Ngày nộp bài
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
								{dataList.map((packageItem, key) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<h5 className="font-medium text-black dark:text-white cursor-pointer"
												onClick={() => updateData(packageItem)}>
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
											<p className="text-black dark:text-white">
												{formatTime(packageItem.created_at, 'DD/MM/yyyy')}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{packageItem.content}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{packageItem?.file &&
												<a className="text-sky-500 dark:text-white " href={buildFile(packageItem?.file)} target={'_blank'}>
													{buildFile(packageItem?.file)}
												</a>}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<a className="text-black dark:text-white" onClick={() => updateData(packageItem)}>
												Chấm điểm
											</a>
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
								getDataList({ page: e, page_size: paging.page_size })
							}} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default CompetitionsResult;