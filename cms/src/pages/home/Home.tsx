import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { toggleShowLoading } from "../../hooks/redux/actions/common.tsx";
import { COMPETITION_SERVICE } from "../../services/api.service.ts";
import { INIT_PAGING } from "../../services/constant.ts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ModalResult from "./ModalResult.tsx";
import { buildFile, formatTime, getItem } from '../../services/helpers.service.ts';
import moment from 'moment';

const HomePage: React.FC = () => {

	const dispatch = useDispatch();
	const [dataList, setDataList] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [open, setOpen] = useState(false)
	const [criteria, setCriteria] = useState(null);
	const [user] = useState(getItem('user'))

	const getDataList = async (filters: any) => {
		dispatch(toggleShowLoading(true));
		const response: any = await COMPETITION_SERVICE.getList(filters);
		dispatch(toggleShowLoading(false));

		if (response?.status == 'success') {
			let data = response.data.result?.map((item: any) => {
				if(item.deadline && moment(item.deadline).startOf('day').isBefore(moment().startOf('day'))) {
					item.status = -1;
				}
				return item;
			})
			setDataList(data || []);
			setPaging(response.data.meta || INIT_PAGING);
		}
	}

	const clickResult = async (item) => {
		setCriteria(item);
		setOpen(!open);
	}

	useEffect(() => {
		getDataList({ ...paging })
	}, []);

	return (
		<DefaultLayout>
			<ModalResult open={open} setOpen={setOpen} criteria={criteria} />

			<div className="py-10 container  bg-white">
				<h2 className={'text-2xl p-3'}><b>Danh sách cuộc thi</b></h2>
				<div className="mt-5 space-y-8 md:grid md:grid-cols-2 md:gap-5">
					{dataList?.length > 0 ? dataList?.map((item: any, key: any) => {
						return <div key={key} className="relative overflow-hidden transition-all 
						duration-500 ease-in-out bg-white border 
						px-5 m-5
						rounded-md border-gray-100/50 group 
						group-data-[theme-color=violet]:hover:border-violet-500 
						group-data-[theme-color=sky]:hover:border-sky-500 
						group-data-[theme-color=red]:hover:border-red-500 
						group-data-[theme-color=green]:hover:border-green-500 
						group-data-[theme-color=pink]:hover:border-pink-500 
						group-data-[theme-color=blue]:hover:border-blue-500 
						hover:-translate-y-2 dark:bg-neutral-900 dark:border-neutral-600">
							<div className="py-6">
								<div className="grid grid-cols-12 gap-5">
									<div className="col-span-12 lg:col-span-3">
										<div className="mb-4 text-center mb-md-0 flex align-center">
											<a >
												<img src={buildFile(item?.image, 'image')}
													alt={item.id} className="mx-auto img-fluid rounded-3" style={{ maxWidth: '80px', maxHeight: '80px' }} />
											</a>
										</div>
									</div>
									<div className="col-span-12 lg:col-span-9">
										<h5 className="mb-1 text-gray-900 fs-17 ">
											<a className="dark:text-gray-50 text-lg hover:text-primary cursor-pointer"
											>{item.name}</a>
											{/* <small className="font-normal text-gray-500 dark:text-gray-300"
											>
												Trường: {item?.school?.name}
											</small> */}
										</h5>
										<ul className=" mb-0">
											<li>
												<p className="mb-0 text-sm text-gray-500 dark:text-gray-300 mb-5">
													<i className="mdi mdi-map-marker"></i>
													<span >Trường: {item?.school?.name}</span>
												</p>
											</li>
											<li>
												<p className="mb-0 text-sm text-gray-500 dark:text-gray-300">
													<i className="mdi mdi-map-marker"></i>
													<div style={{ wordBreak: 'break-word' }} className="text-break" style={{ maxWidth: 300 }}
														dangerouslySetInnerHTML={{ __html: item.contents }}>
													</div>
												</p>
											</li>
										</ul>
										<div className="mt-4">
											<span>Tiêu chí: </span>
											<div className="flex flex-wrap gap-1.5 mt-2">
												{item.criterias?.map((criteria: any, key2: number) => {
													return (
														<span key={key2} className={`${key2 % 2 == 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'} 
														text-11 px-2 py-0.5 font-medium rounded`} >
															{criteria.name}
														</span>
													)
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="px-4 py-3 bg-gray-50 dark:bg-neutral-700">
								<div className="grid grid-cols-12">
									<div className="col-span-12 lg:col-span-6">
										<ul className="flex flex-wrap gap-2 text-gray-700 dark:text-gray-50">
											<li><i className="uil uil-tag"></i> Deadline :</li>
											<li>
												<a href="javascript:void(0)"
													className="text-gray-500 dark:text-gray-50 mr-2">
													{formatTime(item.deadline, 'DD/MM/yyyy')}
												</a>
											</li>
										</ul>
									</div>
									{item.status != 1 ? <div className={'col-span-12 md:flex md:justify-between my-2'}>
										<div
											className='inline-flex items-center 
																justify-center gap-2.5 bg-sky-500 py-2 
																px-2 text-center bg-red-500/20 text-red-500
																font-medium hover:bg-opacity-90 lg:px-2 xl:2'
										>Đã kết thúc</div>
									</div> : ''}
									{user?.type == 'STUDENT' && <div className='col-span-12 md:flex md:justify-between'>

										{!item?.check_result ? <div className={'flex mt-2'}>
											{item.status == 1 ? <Link
												onClick={() => clickResult(item)}
												to="#"
												className="inline-flex items-center justify-center gap-2.5 bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2"
											>
												Tham gia
											</Link> : ''}
										</div> : <div className={'flex mt-2'}>
											<Link to="/competitions-me"
												className='inline-flex items-center justify-center gap-2.5 bg-sky-500 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2'
											>Đã nộp bài</Link>
										</div>}
									</div>}
								</div>
							</div>

						</div>
					})
						: ''}
				</div>
			</div>
		</DefaultLayout >
	);
};

export default HomePage;
