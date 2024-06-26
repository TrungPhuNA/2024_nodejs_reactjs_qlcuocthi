import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './components/common/Loader/index.tsx';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import HomePage from "./pages/home/Home.tsx";
import UserPage from "./pages/user/User.tsx";
import SchoolPage from "./pages/schools/School.tsx";
import ClassPage from "./pages/class/Class.tsx";
import CompetitionsPage from "./pages/competitions/Competitions.tsx";
import CriteriasPage from "./pages/criterias/Criterias.tsx";
import CompetitionsMe from "./pages/results/CompetitionsMe.tsx";
import CompetitionsResult from "./pages/results/CompetitionsResult.tsx";
import CompetitionForm from './pages/competitions/CompetitionForm.tsx';
import UserForm from './pages/user/UserForm.tsx';
import DashboardPage from './pages/home/Dashboard.tsx';
import CompetitionDetail from './pages/competitions/CompetitionDetail.tsx';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return loading ? (
		<Loader isShowAll={loading} />
	) : (
		<>
			<Routes>
				<Route
					index
					element={
						<>
							<PageTitle title="Trang chủ" />
							<HomePage />
						</>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<>
							<PageTitle title="Dashboard" />
							<DashboardPage />
						</>
					}
				/>
				<Route
					path="/competitions-list"
					element={
						<>
							<PageTitle title="Danh sách cuộc thi" />
							<HomePage />
						</>
					}
				/>
				<Route
					path="/competitions/:id"
					element={
						<>
							<PageTitle title="Chi tiết cuộc thi" />
							<CompetitionDetail />
						</>
					}
				/>
				<Route
					path="/school"
					element={
						<>
							<PageTitle title="Quản lý trường" />
							<SchoolPage />
						</>
					}
				/>
				<Route
					path="/class"
					element={
						<>
							<PageTitle title="Quản lý lớp" />
							<ClassPage />
						</>
					}
				/>
				<Route
					path="/competitions"
					element={
						<>
							<PageTitle title="Quản lý cuộc thi" />
							<CompetitionsPage />
						</>
					}
				/>
				<Route
					path="/competitions/create"
					element={
						<>
							<PageTitle title="Quản lý cuộc thi" />
							<CompetitionForm />
						</>
					}
				/>
				<Route
					path="/competitions/edit/:id"
					element={
						<>
							<PageTitle title="Quản lý cuộc thi" />
							<CompetitionForm />
						</>
					}
				/>
				<Route
					path="/criterias"
					element={
						<>
							<PageTitle title="Quản lý tiêu chí cuộc thi" />
							<CriteriasPage />
						</>
					}
				/>
				<Route
					path="/competitions-me"
					element={
						<>
							<PageTitle title="Cuộc thi của bạn" />
							<CompetitionsMe />
						</>
					}
				/>
				<Route
					path="/result/round-one"
					element={
						<>
							<PageTitle title="Vòng 1" />
							<CompetitionsResult />
						</>
					}
				/>
				<Route
					path="/result/round-two"
					element={
						<>
							<PageTitle title="Vòng 2" />
							<CompetitionsResult />
						</>
					}
				/>
				<Route
					path="/result/round-three"
					element={
						<>
							<PageTitle title="Vòng 3" />
							<CompetitionsResult />
						</>
					}
				/>
				<Route
					path="/user"
					element={
						<>
							<PageTitle title="Quản lý thành viên" />
							<UserPage />
						</>
					}
				/>
				<Route
					path="/user/update/:id"
					element={
						<>
							<PageTitle title="Quản lý thành viên" />
							<UserForm />
						</>
					}
				/>
				<Route
					path="/user/store"
					element={
						<>
							<PageTitle title="Quản lý thành viên" />
							<UserForm />
						</>
					}
				/>
				<Route
					path="/calendar"
					element={
						<>
							<PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Calendar />
						</>
					}
				/>
				<Route
					path="/profile"
					element={
						<>
							<PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Profile />
						</>
					}
				/>
				<Route
					path="/forms/form-elements"
					element={
						<>
							<PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<FormElements />
						</>
					}
				/>
				<Route
					path="/forms/form-layout"
					element={
						<>
							<PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<FormLayout />
						</>
					}
				/>
				<Route
					path="/tables"
					element={
						<>
							<PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Tables />
						</>
					}
				/>
				<Route
					path="/settings"
					element={
						<>
							<PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Settings />
						</>
					}
				/>
				<Route
					path="/chart"
					element={
						<>
							<PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Chart />
						</>
					}
				/>
				<Route
					path="/ui/alerts"
					element={
						<>
							<PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Alerts />
						</>
					}
				/>
				<Route
					path="/ui/buttons"
					element={
						<>
							<PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<Buttons />
						</>
					}
				/>
				<Route
					path="/auth/signin"
					element={
						<>
							<PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<SignIn />
						</>
					}
				/>
				<Route
					path="/auth/signup"
					element={
						<>
							<PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
							<SignUp />
						</>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
