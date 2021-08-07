import React from "react";
import Showdatatable from "../componet/Showdatatable";
import { useHistory } from "react-router";

const Dashboard = () => {
    let index = localStorage.getItem("loginUserIndex");
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("loginUserIndex");
        history.push("/login")
    };

    return (
        <>
            <div className="btnLogout">
                <input type="button" class="btn btn-light btn-lg" value="Log Out" onClick={handleLogout} />
            </div>
            {index ? <Showdatatable userIndex={index} /> : null}
        </>
    );
}
export default Dashboard;