import { connect } from "react-redux";

const className = "bg-opacity-60 bg-white z-50 fixed top-0 left-0 w-full h-full"

function Loading({ isShowLoading, isShowAll }: any) {

	if (isShowLoading)
		return (
			<div className={`flex h-screen items-center justify-center ${isShowLoading ? className : 'bg-white'}  dark:bg-black`}>
				<div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
			</div>
		);
	if(!isShowLoading && isShowAll)
	return (
		<div className={`flex h-screen items-center justify-center ${isShowLoading ? className : 'bg-white'}  dark:bg-black`}>
			<div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
		</div>
	);
	return null;
};

const mapStateToProps = function (state: any) {
	return {
		isShowLoading: state.commonReducer.showLoading,
	}
}

export default connect(mapStateToProps)(Loading)
