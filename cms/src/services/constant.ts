export const URL_API = import.meta.env.VITE_API_URL ||  'http://localhost:3001/api/v1/';
export const URL_API_PREFIX = {
	AUTH: 'auth',
	ORDER: 'order',
	UPLOAD: 'upload',
	CATEGORY: 'category'
};

import defaultUser from '../images/image/default-avatar.png';
import emptyImg from '../images/image/logo-empty.png';
import defaultImg from '../images/image/image_faildoad.png';
import errorImg from '../images/image/cancel.png';
import success from '../images/image/success-v2.png';

export const DEFAULT_IMG = defaultUser;
export const EMPTY_IMG = emptyImg;
export const DEFAULT_IMAGE = defaultImg;

export const ERROR_PAYMENT = errorImg;
export const SUCCESS_PAYMENT = success;



export const Gender = [
	{
		value: 'NAM',
		label: 'Nam'
	},
	{
		value: 'Nữ',
		label: 'Nữ'
	},
	{
		value: 'Khác',
		label: 'Khác'
	}
];

export const INIT_PAGING = {
	page: 1,
	page_size: 10,
	total_page: 1,
	total: 0
};

export const STATUSES = [
	{
		id: 1,
		name: 'Hoạt động',
		value: 1,
		label: 'Hoạt động'
	},
	{
		id: -1,
		name: 'Tạm dừng',
		value: -1,
		label: 'Tạm dừng'
	},
	
];

export const USER_TYPE = [
	{
		id: "RECTOR",
		name: 'Hiệu Trưởng'
	},
	{
		id: 'TEACHER',
		name: 'Giáo viên'
	},
	{
		id: 'STUDENT',
		name: 'Sinh viên'
	},
	
];

