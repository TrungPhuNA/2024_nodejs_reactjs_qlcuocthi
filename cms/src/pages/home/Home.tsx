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
import CompetitionItem from '../../components/Home/CompetitionItem.tsx';

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
				<div className="m-5 md:grid md:grid-cols-3 xl:grid-cols-4 md:gap-5 xl:gap-3">
					{dataList?.length > 0 ? dataList?.map((item: any, key: any) => {
						return <CompetitionItem item={item} key={key} user={user} clickResult={clickResult}/>
					})
						: ''}
				</div>
			</div>
		</DefaultLayout >
	);
};

export default HomePage;
