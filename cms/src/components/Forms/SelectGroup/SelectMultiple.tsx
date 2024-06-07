import React, { useState } from 'react';
import "antd/dist/reset.css";
import { Select } from 'antd';
import { setField } from '../../../services/helpers.service';

const SelectMultipleAnt: React.FC = (props: any) => {

	return (
		<Select
			placeholder={props.placeholder || 'Chọn giá trị'}
			style={{ width: '100%' }}
			value={props.value}
			size='large'
			mode={props.mode || ''}
			className=' h-auto form-select form-control-md'
			onChange={(e) => {
				if (props.key_obj) {
					setField(e, props.key_obj, props.form, props.setForm)
				} else {
					setField(null, props.key_obj, props.form, props.setForm)
				}
				if (props.data?.length > 0) {
					let data = props.data?.filter((item: any) => e.includes(item.id));
					props.setDataList(data);
				}
			}}
			options={props.data}
		/>
	);
};

export default SelectMultipleAnt;
