const initValue = {
	showLoading: false
};
export const commonReducer = ( state = initValue, action: any ) =>
{
	switch ( action.type )
	{
		case 'LOADING':
			return {
				...state,
				showLoading: action.showLoading,
			};
		default: 
		return initValue;
	}
}