
import moment from 'moment';

export const getItem = (key: any) => {
	let value: any = localStorage.getItem(key) ;
	return value && JSON.parse(value) || null;
}

export const setItem = (key: any, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
}

export const removeItem = (key: any) => {
	localStorage.removeItem(key);
}

export const buildFilter = (values: any) => {

	let params = {};
	if (values) {
		delete values.total;
		delete values.total_pages;
		delete values.count;
		let arrCondition = Object.entries(values);

		params = arrCondition.reduce((param, item) => {
			if (item[1] != null) {
				param = { ...param, ...buildItemParam(item[0], item[1], param) }
			}
			return param;
		}, {});
	}
	return params;
}

export const buildItemParam = (key: any, value: any, params: any) => {
	if (key == 'page' && !value) {
		params['page'] = value;
	} else if (value) {
		params[`${key}`] = value;
	}
	return params;
}

export const timeDelay = async (delay: number) => {
	return new Promise(res => setTimeout(res, delay))
}

export const VALIDATE_FORM = {
	required: '${label} không được để trống!',
	types: {
		email: '${label} không đúng định dạng email',
		number: '${label} không đúng định dạng số',
	},
	number: {
		range: '${label} trong khoảng ${min} - ${max}',
	},
};

export const formatTime = (value: any, format: any): any => {
	if (value) {
		if (format) return moment(value).format(format);
		return moment(value)
	}

	return null;
}

export const formatMoney = (money: any) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
}

export const range = (start: any, end: any) => {
	let length = end - start + 1;
	/*
		Create an array of certain length and set the elements within it from
	  start value to end value.
	*/
	return Array.from({ length }, (_, idx) => idx + start);
};
