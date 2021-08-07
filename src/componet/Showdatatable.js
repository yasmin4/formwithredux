import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import { Country, State, City } from 'country-state-city';
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
const Showdatatable = (props) => {
    let { record } = useSelector((state) => state.formRecordReducer);
    const countries = Country.getAllCountries();
    const [countryDetail, setCountryDetail] = useState(null);
    const [stateDetail, setStateDetail] = useState(null);
    const [cityDetail, setCityDetail] = useState(null);
    const history=useHistory();
    

    const getCountry = () => {
        
        if (props.userIndex && record[props.userIndex]["country"]) {
            // Get country details based on country index from countries array
            const countryData = countries[record[props.userIndex]["country"]];
            setCountryDetail(countryData);
        }
    };

    useEffect(() => {
        if (record && record[props.userIndex]) {
            getCountry();
        } else {
            // redirect user to login page
            history.push('/login');

        } 
       
    });

    useEffect(() => {
        // So when country details will update we are suppsose to get for state details and store it into stateDetails state. Same needs to be done for city. Is it clear now?noo
        if(countryDetail){
            const stateOfSelectedCountry = State.getStatesOfCountry(countryDetail.isoCode);
            const selectedState=stateOfSelectedCountry[record[props.userIndex]["state"]];
            setStateDetail(selectedState)
            console.log("select state",selectedState.name)
        }
    })
    useEffect(()=>{
        if(stateDetail&& countryDetail){
            const cityOfSelectedState = City.getCitiesOfState(countryDetail.isoCode,stateDetail.isoCode);
            const selectedCity=cityOfSelectedState[record[props.userIndex]["city"]];
            setCityDetail(selectedCity);
            
            console.log("selected city",selectedCity.name);
        }
    })
    return (
        <div className="showtable">
            <Table striped bordered hover className="customtable">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{record[props.userIndex]["firstName"]}</td>
                        <td>{record[props.userIndex]["lastName"]}</td>
                        <td>{record[props.userIndex]["email"]}</td>
                        <td>{record[props.userIndex]["age"]}</td>
                        <td>{countryDetail?.name || "-"}</td>
                        <td>{stateDetail?.name||'-' }</td>
                        <td>{cityDetail?.name||'-'}</td>
                    </tr>
                </tbody>
            </Table>
         
        </div>
      
    );

}
export default Showdatatable;