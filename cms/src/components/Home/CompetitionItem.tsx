import React, { ReactNode } from 'react';
import { buildFile, formatTime } from '../../services/helpers.service';
import { Link } from 'react-router-dom';

const CompetitionItem: React.FC = ({ item, user, key, ...props }: any) => {
	return (
		<div key={key} className="relative overflow-hidden transition-all 
						duration-500 ease-in-out bg-white 
						rounded-md shadow shadow-gray-500
						hover:-translate-y-2 dark:bg-neutral-900 dark:border-neutral-600"
			style={{ marginTop: '0', marginBottom: '10px' }}>
			<Link to={'/competitions/' + item.id} className="mb-4 text-center mb-md-0">
				<img src={buildFile(item?.image, 'image')}
					alt={item.id} className="img-fluid rounded-3 w-full"
					style={{ maxHeight: '200px', objectFit: 'cover' }} />
			</Link>
			<div className="p-3 flex flex-col justify-between" style={{ height: 'calc(100% - 200px)' }}>
				<div>
					<Link to={'/competitions/' + item.id}
						className="dark:text-gray-50 text-black text-3xl 
						mb-3
						hover:text-primary cursor-pointer" style={{ wordBreak: 'break-word', }}
					>{item.name}</Link>
					<ul className=" mb-0 mt-1">
						<li>
							<p className="mb-0 text-sm text-gray-500 dark:text-gray-300 mb-3">
								<i className="mdi mdi-map-marker"></i>
								<span >Trường: <b>{item?.school?.name}</b></span>
							</p>
						</li>
					</ul>
					{item?.total_result ? <div className={'col-span-12 md:flex md:justify-between my-2'}>
						<div
							className='inline-flex items-center 
						justify-center gap-2.5 bg-blue-500  py-2 
						px-2 text-center  text-white
						font-medium hover:bg-opacity-90 lg:px-2 xl:2'
						>{item.total_result} BÀI DỰ THI</div>
					</div> : ''}
				</div>
				<div className=" py-3 bg-gray-50 dark:bg-neutral-700">
					<div className="grid grid-cols-12">
						<div className="col-span-12 lg:col-span-6">
							<ul className="flex flex-wrap gap-2 text-gray-700 dark:text-gray-50">
								<li><i className="uil uil-tag"></i>Thời gian cuộc thi :</li>
								<li>
									<b>{formatTime(item.created_at, 'DD/MM/yyyy')}</b> - <b>{formatTime(item.deadline, 'DD/MM/yyyy')}</b>
								</li>
							</ul>
						</div>
						{item.status != 1 ? <div className={'col-span-12 md:flex md:justify-between my-2'}>
							<div
								className='inline-flex items-center 
													justify-center gap-2.5 py-2 
													px-2 text-center bg-red-500/20 text-red-500
													font-medium hover:bg-opacity-90 lg:px-2 xl:2'
							>Kết thúc</div>
						</div> : ''}
						{user?.type == 'STUDENT' && <div className='col-span-12 md:flex md:justify-end'>

							{!item?.check_result ? <div className={'flex mt-2'}>
								{item.status == 1 ? <Link
									onClick={() => props.clickResult(item)}
									to="#"
									className="inline-flex items-center justify-center gap-2.5 bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2"
								>
									Tham gia
								</Link> : ''}
							</div> : ''
							// <div className={'flex mt-2'}>
							// 	<Link to="/competitions-me"
							// 		className='inline-flex items-center justify-center 
							// 		gap-2.5 bg-sky-500 py-2 px-2 text-center 
							// 		font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2'
							// 	>Đã tham gia</Link>
							// </div>
							}
						</div>}
					</div>
				</div>
			</div>
			{/*<div className="py-6">






				 <div className="grid grid-cols-12 gap-5">
					<div className="col-span-12">
						<div className="mb-4 text-center mb-md-0 flex align-center">
							<a >
								<img src={buildFile(item?.image, 'image')}
									alt={item.id} className="mx-auto img-fluid rounded-3" style={{ maxHeight: '200px' }} />
							</a>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-9">
						<h5 className="mb-1 text-gray-900 fs-17 ">
							<a className="dark:text-gray-50 text-lg hover:text-primary cursor-pointer"
							>{item.name}</a>
							<small className="font-normal text-gray-500 dark:text-gray-300"
											>
												Trường: {item?.school?.name}
											</small>
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
									<div style={{ wordBreak: 'break-word', maxWidth: 300 }} className="text-break"
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
								onClick={() => props.clickResult(item)}
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
			</div> */}

		</div>
	);
};

export default CompetitionItem;
