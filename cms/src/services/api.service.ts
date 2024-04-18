import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService.service"
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

		return await getMethod(`cms/user/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`cms/user/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`cms/user/delete/` + id);
	},
};

export const CLASS_SERVICE = {
	async getList(filters: any) {
		await timeDelay(1000)

		const params = buildFilter(filters);
		return await getMethod(`cms/classroom/list`, params);
	},
	async store(data: any) {
		await timeDelay(1000)

		return await postMethod(`cms/classroom/store`, data);
	},
	async show(id: any) {
		await timeDelay(1000)

		return await getMethod(`cms/classroom/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`cms/classroom/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`cms/classroom/delete/` + id);
	},
};

export const CRITERIA_SERVICE = {
	async getList(filters: any) {
		await timeDelay(1000)

		const params = buildFilter(filters);
		return await getMethod(`cms/criteria/list`, params);
	},
	async store(data: any) {
		await timeDelay(1000)

		return await postMethod(`cms/criteria/store`, data);
	},
	async show(id: any) {
		await timeDelay(1000)

		return await getMethod(`cms/criteria/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`cms/criteria/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`cms/criteria/delete/` + id);
	},
};

export const COMPETITION_SERVICE = {
	async getList(filters: any) {
		await timeDelay(1000)

		const params = buildFilter(filters);
		return await getMethod(`cms/competition/list`, params);
	},
	async store(data: any) {
		await timeDelay(1000)

		return await postMethod(`cms/competition/store`, data);
	},
	async show(id: any) {
		await timeDelay(1000)

		return await getMethod(`cms/competition/show/` + id, {});
	},
	async update(id: any, data: any) {
		await timeDelay(1000)
		return await putMethod(`cms/competition/update/` + id, data);
	},
	async delete(id: any) {
		await timeDelay(1000)
		return await deleteMethod(`cms/competition/delete/` + id);
	},
};
