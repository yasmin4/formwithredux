import React from "react";
import { useParams } from 'react-router-dom'; 
import { useSelector } from "react-redux";
import Showdatatable from "../componet/Showdatatable";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
const Dashboard=()=>{
    let index = localStorage.getItem("loginUserIndex");
     let {record}= useSelector((state)=>state.formRecordReducer);
    console.log("index",index);
    const history=useHistory();
    // console.log("userData",userData);
    const handleLogout=()=>{
        let index=localStorage.removeItem("loginUserIndex");
        history.push("/login")

    }
 
    return(
        <>
             <div className="btnLogout"><input type="button" class="btn btn-light btn-lg" value="Log Out" onClick={handleLogout} /></div>
            {/* {
                record && record.length && record[index] ?
                    <pre>{JSON.stringify(record[index])}</pre>
                    : null
            } */}
            {index ?  <Showdatatable userIndex={index} />: null}
           
           
        </>
    );

}
export default Dashboard;