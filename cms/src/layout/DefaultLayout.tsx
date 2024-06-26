import React, {useState, ReactNode, useEffect} from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import Loader from '../components/common/Loader';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [accessToken] = useState(localStorage.getItem('access_token') || null);

    useEffect(() => {
        if (!accessToken && !window.location.href.includes('/auth')) {
            localStorage.clear();
            window.location.href = '/auth/signin';
        }
    }, [])

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                {accessToken && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {accessToken && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <Loader/>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
