import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService.service"
import { URL_API_PREFIX } from "./constant";
import { buildFilter, timeDelay } from "./helpers.service";

export const SCHOOL_SERVICE = {
	async getList(filters: any) {
		await timeDelay(1000)

		const params = buildFilter(filters);
		return await getMethod(`cms/school/list`, params);
	},
	async store(data: any) {
		await timeDelay(1000)

		return await postMethod(`cms/school/store`, data);
	},
	async show(id: any) {
		await timeDelay(1000)

		return await getMethod(`cms/school/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`cms/school/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`cms/school/delete/` + id);
	},
};

export const USER_SERVICE = {
	async getList(filters: any) {
		await timeDelay(1000)

		const params = buildFilter(filters);
		return await getMethod(`cms/user/list`, params);
	},
	async store(data: any) {
		await timeDelay(1000)

		return await postMethod(`cms/user/store`, data);
	},
	async show(id: any) {
		await timeDelay(1000)

		return await getMethod(`${URL_API_PREFIX.ORDER}/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`${URL_API_PREFIX.ORDER}/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`${URL_API_PREFIX.ORDER}/delete/` + id);
	},
};
