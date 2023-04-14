import { useSelector } from "react-redux";
import { Sidebar, Topbar } from "../../Navbars";
import { Navigate } from "react-router-dom";

import "./dashboard.css";
import DashboardContentComponent from "../../dashboard-content";

const DashboardPage = () => {

    const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));
    
    if ( !Boolean(user) ) return <Navigate to="/" replace />;

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <Sidebar user={user}/>
                <div className="dashboard-content-container">
                    <Topbar user={user}/>
                    <div className="dashboard-content">
                        <DashboardContentComponent user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;