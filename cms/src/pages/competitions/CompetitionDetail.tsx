import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import { COMPETITION_SERVICE, CRITERIA_SERVICE, SCHOOL_SERVICE, USER_SERVICE } from "../../services/api.service.ts";
import { STATUSES } from "../../services/constant.ts";
import { buildFile, formatTime, getItem, setField } from "../../services/helpers.service.ts";
import { useDispatch } from 'react-redux';
import { toggleShowLoading } from '../../hooks/redux/actions/common.tsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo.tsx';
import MultiSelect from '../../components/Forms/MultiSelect.tsx';
import SelectMultipleAnt from '../../components/Forms/SelectGroup/SelectMultiple.tsx';
import CkeditorPage from '../../components/Forms/CkEditorPage.tsx';
import ModalResult from '../home/ModalResult.tsx';



const CompetitionDetail: React.FC = () => {


	const dispatch = useDispatch();
	const [detail, setDetail]: any = useState(null);
	const [user] = useState(getItem('user'));


	const { id } = useParams();
	const [open, setOpen] = useState(false)
	const [criteria, setCriteria] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			getDetail(id);
		}
	}, [id]);

	const getDetail = async (id: any) => {
		dispatch(toggleShowLoading(true));
		const response: any = await COMPETITION_SERVICE.show(id);
		dispatch(toggleShowLoading(false));
		if (response?.status == 'success') {
			let data = response.data;
			setDetail(data);

		}
	}



	const clickResult = async (item: any) => {
		setCriteria(item);
		setOpen(!open);
	}

	return (
		<DefaultLayout>
			<Breadcrumb pageName={'Chi tiết cuộc thi'} />
			<ModalResult open={open} setOpen={setOpen} criteria={criteria} />
			<div className="flex flex-col gap-10">
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className={'mb-3 flex justify-end'}>
						<Link to={'/'}
							className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
						>
							Trở lại
						</Link>
					</div>
					<div>
						<div className="p-3">
							<div className="md:flex md:justify-between md:aligns-center">
								<div>
									<h3 className="dark:text-gray-50 text-black text-4xl 
				hover:text-primary cursor-pointer mb-2"
									><b>{detail?.name}</b></h3>
									<ul className=" mb-0 mt-1">
										{detail?.school && <li>
											<p className="mb-0 text-sm text-gray-500 dark:text-gray-300">

												<span className='text-lg'>Trường: <b>{detail?.school?.name}</b></span>
											</p>
										</li>}
										{
											detail?.deadline && <li>
												<p className="mb-0 text-sm text-gray-500 dark:text-gray-300">

													<span className='text-lg'>Thời hạn: <b>{formatTime(detail?.deadline, 'DD/MM/yyyy')}</b></span>
												</p>
											</li>
										}
									</ul>
								</div>
								<div className="flex items-center">
									{detail?.status != 1 ? <div className={'col-span-12 md:flex md:justify-between my-2'}>
										<div
											className='inline-flex items-center 
																justify-center gap-2.5 py-2 
																px-2 text-center bg-red-500/20 text-red-500
																font-medium hover:bg-opacity-90 lg:px-2 xl:2'
										>Kết thúc</div>
									</div> : ''}
									{user?.type == 'STUDENT' && <div className='col-span-12 md:flex md:justify-between items-center'>

										{!detail?.check_result ? <div className={'flex mt-2'}>
											{detail?.status == 1 ? <Link
												onClick={() => clickResult(detail)}
												to="#"
												className="inline-flex items-center justify-center gap-2.5 bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2"
											>
												Tham gia
											</Link> : ''}
										</div> : <div className={'flex mt-2'}>
											<Link to="/competitions-me"
												className='inline-flex items-center justify-center gap-2.5 bg-sky-500 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2'
											>Đã tham gia</Link>
										</div>}
									</div>}
								</div>
							</div>
							<div className='text-center my-5'>
								<img src={buildFile(detail?.image, 'image')}
									alt={detail?.id} className="img-fluid rounded-3 w-full hover:-translate-y-2"
									style={{ maxHeight: '300px', objectFit: 'contain' }} />
							</div>
							<p className="mb-0 text-sm text-gray-500 dark:text-gray-300">
								<div style={{ wordBreak: 'break-word' }} className="text-break"
									dangerouslySetInnerHTML={{ __html: detail?.contents }}>
								</div>
							</p>
							<div className="mt-4">
								<span className='text-lg'><b>Tiêu chí:</b> </span>
								<div className="flex flex-wrap gap-1.5 mt-2">
									{detail?.criterias?.map((criteria: any, key2: number) => {
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
			</div>
		</DefaultLayout>
	);
};

export default CompetitionDetail;
