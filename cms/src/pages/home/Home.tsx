import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { toggleShowLoading } from "../../hooks/redux/actions/common.tsx";
import { COMPETITION_SERVICE } from "../../services/api.service.ts";
import { INIT_PAGING } from "../../services/constant.ts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ModalResult from "./ModalResult.tsx";
import { getItem } from '../../services/helpers.service.ts';

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
			setDataList(response.data.result || []);
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
			<div className="grid">
				<div className={'bg-white p-5'}>
					<h2 className={'text-2xl pb-3'}>Danh sách cuộc thi</h2>
					<ol className="list-decimal pl-4">
						{dataList.length > 0 && dataList.map((item: any, key: number) => {
							return (
								<li className={'mb-4'} key={key}>
									<p className='mb-0'><b>{item.name}</b></p>
									<p>{item.contents}</p>
									{item.criterias && item.criterias.length > 0 && (
										<>
											<h3 className={'text-xl pb-2 pt-2'}>Danh sách tiêu chí</h3>
											<ul className={'pl-5 list-disc'}>
												{item.criterias.map((criteria: any, key2: number) => {
													return (
														<li key={key2}>{criteria.name}</li>
													)
												})}
											</ul>
										</>
									)}
									{user?.type == 'STUDENT' && <>
										{!item?.check_result ? <div className={'flex mt-2'}>
											<Link
												onClick={() => clickResult(item)}
												to="#"
												className="inline-flex items-center justify-center gap-2.5 bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2"
											>
												Nộp bài thi
											</Link>
										</div> : <div className={'flex mt-2'}>
											<Link to="/competitions-me"
												className='inline-flex items-center justify-center gap-2.5 bg-sky-500 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:2'
											>Đã nộp bài</Link>
										</div>}
									</>}

								</li>
							)
						})}
					</ol>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default HomePage;
