import {useEffect, useRef, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {FaUser, FaGraduationCap, FaInbox, FaFolder, FaCode} from "react-icons/fa";
import {getItem} from "../../services/helpers.service.ts";
import { FaRankingStar } from 'react-icons/fa6';
import Logo from "../../images/logo.png";
interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const configRoute = [
	{
        name: "Dashboard",
        route: "/dashboard",
        icon: FaRankingStar,
        role: ['RECTOR', 'ADMIN']
    },
	{
        name: "Danh sách cuộc thi",
        route: "/competitions-list",
        icon: FaRankingStar,
        role: ['STUDENT']
    },
    {
        name: "QL Trường",
        route: "/school",
        icon: FaGraduationCap,
        role: ['RECTOR']
    },

    {
        name: "QL Lớp",
        route: "/class",
        icon: FaInbox,
        role: ['RECTOR']
    },
    {
        name: "Tiêu chí",
        route: "/criterias",
        icon: FaFolder,
        role: ['RECTOR','TEACHER']
    },
    {
        name: "Cuộc Thi",
        route: "/competitions",
        icon: FaCode,
        role: ['RECTOR','TEACHER']
    },
    {
        name: "Thành viên",
        route: "/user",
        icon: FaUser,
        role: ['RECTOR']
    },
    {
        name: "Cuộc thi của bạn",
        route: "/competitions-me",
        icon: FaCode,
        role: ['STUDENT']
    },
    {
        name: "Chấm thi vòng 1",
        route: "/result/round-one",
        icon: FaCode,
        role: ['RECTOR','TEACHER']
    },
	{
		name: "Chấm thi vòng 2",
		route: "/result/round-two",
        icon: FaCode,
		role: ['RECTOR','TEACHER']
	},
	{
		name: "Chấm thi vòng 3",
		route: "/result/round-three",
        icon: FaCode,
		role: ['RECTOR','TEACHER']
	}

]
const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
    const location = useLocation();
    const {pathname} = location;

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);


    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );
    const [user] = useState(getItem('user'))
    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const checkRole = (type: string, role: any) => {
        if (role.includes(type)) return true;
        return false;
    }

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <img src={Logo} style={{width: '100px', paddingLeft: '10px'}}
                         alt="Logo"/>
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            { configRoute.map((item: any, key: number) => {
                                return (
                                    (checkRole(user.type, item.role) === true && (
                                        <li key={key}>
                                            <NavLink
                                                to={`${item.route}`}
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    pathname.includes(item.route) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                            >
                                                {item.icon ? <item.icon/> : '  '}
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
