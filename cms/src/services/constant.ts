export const URL_API = 'http://localhost:3001/api/v1/';
export const URL_API_PREFIX = {
	AUTH: 'auth',
	ORDER: 'order',
	UPLOAD: 'upload',
	CATEGORY: 'category'
};



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
		name: 'Hoạt động'
	},
	{
		id: -1,
		name: 'Tạm dừng'
	},
	
];
