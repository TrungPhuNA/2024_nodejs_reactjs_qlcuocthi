import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import FormCreateOrUpdateUser from "./FormCreateOrUpdateUser.tsx";
import { INIT_PAGING } from "../../services/constant.ts";
import {USER_SERVICE} from "../../services/api.service.ts";
import { formatTime, getItem } from "../../services/helpers.service.ts";
import { PagingPage } from '../../components/common/paging/PagingCpn.tsx';
import { useDispatch } from 'react-redux';
import { toggleShowLoading } from '../../hooks/redux/actions/common.tsx';
import { useNavigate } from 'react-router-dom';
import { FaArrowsRotate } from "react-icons/fa6";


const UserPage: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [detail, setDetail] = useState(null);
	const [user, setUser] = useState(getItem('user'));
	const dispatch = useDispatch();

	const navigate = useNavigate()

	const triggerModalForm = () => {
		navigate('/user/store')
	}

	useEffect(() => {
		if (!open) {
			setDetail(null)
		}
	}, [open]);

	const getDataList = async (filters: any) => {
		dispatch(toggleShowLoading(true));
		const response: any = await USER_SERVICE.getList(filters);
		dispatch(toggleShowLoading(false));
		if (response?.status == 'success') {
			setDataList(response.data.result || []);
			setPaging(response.data.meta || INIT_PAGING);
		}
	}

	const deleteItem = async (item: any) => {
		console.info("===========[] ===========[item] : ",item);
		await USER_SERVICE.delete(item.id);
		getDataList({ ...paging })
	}

	const updateData = async (item: any) => {
		// setOpen(!open);
		// setDetail(item);
		// console.log('-------------- update: ', item);
		if (user?.type == "RECTOR" || user?.type == "ADMIN")
			navigate('/user/update/' + item.id)
	}

	useEffect(() => {
		getDataList({ ...paging })
	}, []);

	return (
		<DefaultLayout>
			<Breadcrumb pageName="Quản lý user" />
			<FormCreateOrUpdateUser open={open} setOpen={setOpen}
				detail={detail} getDataList={getDataList} params={paging}
			/>
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className={'mb-3 flex justify-end'}>
						<div
							onClick={() => triggerModalForm()}
							className="inline-flex items-center justify-center bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5 rounded-md cursor-pointer"
						>
							Thêm mới
						</div>
					</div>
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
										Thông tin
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Ngày tạo
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Chức vụ
									</th>
									<th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
										Trạng thái
									</th>
									<th className="py-4 px-4 font-medium text-black dark:text-white justify-center flex">
										Thao tác
									</th>
								</tr>
							</thead>
							<tbody>
								{dataList.map((packageItem, key) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<div className={'flex'}>
												<div onClick={() => updateData(packageItem)} className={'cursor-pointer'}>
													<h5 className="font-medium text-black dark:text-white">
														{packageItem.name}
													</h5>
													<p className="text-sm">{packageItem.username}</p>
													<p className="text-sm">{packageItem.email}</p>
												</div>
											</div>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">
												{formatTime(packageItem.created_at, 'DD/MM/yyyy')}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">
												{packageItem.type}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === 1
													? 'bg-success text-success'
													: packageItem.status === -1
														? 'bg-danger text-danger'
														: 'bg-warning text-warning'
													}`}
											>
												{packageItem.status == 1 ? "Hoạt động" : "Tạm dừng"}
											</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<div className="flex items-center space-x-3.5 justify-center">
												<button className="hover:text-primary" onClick={() => deleteItem(packageItem)}>
													<svg
														className="fill-current"
														width="18"
														height="18"
														viewBox="0 0 18 18"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
															fill=""
														/>
														<path
															d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
															fill=""
														/>
														<path
															d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
															fill=""
														/>
														<path
															d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
															fill=""
														/>
													</svg>
												</button>
												<button title='Đổi mật khẩu' onClick={(e) => {
													setOpen(true)
													setDetail(packageItem)
												}}>
													<FaArrowsRotate title='Đổi mật khẩu' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="mt-3 py-5" >
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

export default UserPage;
