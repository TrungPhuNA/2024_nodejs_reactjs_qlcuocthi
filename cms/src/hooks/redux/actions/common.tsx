export const toggleShowLoading = ( boolean: any ) =>
{
	return {
		type: 'LOADING',
		showLoading: boolean,
	};
}