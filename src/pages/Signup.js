import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ReactBootstrap, { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import FormControl from 'react-bootstrap/FormControl';
import Inputbox from "../componet/Inputbox";
import Dropdowninput from "../componet/Dropdowninput";
import { Country, State, City } from 'country-state-city';
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "../action/action";
import formRecordReducer from "../reducer/reducer";
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const countries = Country.getAllCountries();
    const dispatch = useDispatch();
    let { record } = useSelector((state) => state.formRecordReducer);
    console.log(" Redux records is: ", record);
    let history = useHistory();
    const [validated, setValidated] = useState(false);

    const [detail, setDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        city: null,
        state: null,
        country: 0
    });
    const [states, setStates] = useState(null);
    const [cities, setCities] = useState(null);

    useEffect(() => {
        const countryDetail = countries[Number(detail.country)];
        const stateOfSelectedCountry = State.getStatesOfCountry(countryDetail.isoCode);
        setStates(stateOfSelectedCountry);
    }, [detail.country]);

    useEffect(() => {
        if (detail.country !== null && detail.state !== null) {
            const selectedCountryDetails = countries[Number(detail.country)];
            const selectedStateDetails = states[Number(detail.state)];
            const cityListing = City.getCitiesOfState(selectedCountryDetails.isoCode, selectedStateDetails.isoCode);
            setCities(cityListing);
        }
    }, [detail.state]);

    const handleOnChange = (event) => {
        const target = event.target;
        const type = target.type;
        const value = target.value;
        const name = target.name;
        setDetail({
            ...detail,
            ...{
                [name]: value
            }
        });
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        let isEmailAlreadyExist = false;
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("in if");
        } else {
            console.log("in else");

            // for loop. isEmailAlreadyExist = true
            let i;
            for (i = 0; i < record.length; i++) {
                if (record[i]["email"] == detail.email) {
                    isEmailAlreadyExist = true;
                }
            }

            if (isEmailAlreadyExist) {

                console.log("matchemail", isEmailAlreadyExist)

                toast.error("this email adress is alredy register plese try with another one or Log in !", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });


            } else {
                dispatch(addRecord([...record, detail]));
                history.push('/login');
            }
        }
        setValidated(true);
    };
    const handleLogin = () => {
        history.push('/login');

    }


    return (
        <div>
            <div className="formContainer">
                <h3>Sign Up</h3>
                <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
                    <Row>
                        <Inputbox label="First Name*" type="text" name='firstName' value={detail.firstName} onChange={handleOnChange} validFeedback="valid" invalidFeedBack="Enter Valid First Name" classname="col-sm-6" />
                        <Inputbox label="Last Name*" type="text" name='lastName' value={detail.lastName} onChange={handleOnChange} validFeedback="valid" invalidFeedBack="Enter Valid Last Name" classname="col-sm-6" />
                        <Inputbox label="Email*" type="email" name='email' value={detail.email} onChange={handleOnChange} validFeedback="valid" invalidFeedBack="Plese Enter Valid Email Address" classname="col-sm-6" />
                        <Inputbox label="Age*" type="number" name='age' value={detail.age} onChange={handleOnChange} validFeedback="valid" invalidFeedBack="Enter Your Age" classname="col-sm-6" />
                        <Inputbox label="Password*" type="password" name="password" value={detail.password} onChange={handleOnChange} validFeedback="valid" invalidFeedBack="Please Enter your Password" classname="col-sm-6" />
                        <Dropdowninput label="Country*" name="country" value={detail.country} onChange={handleOnChange} optionValue={countries} classname="col-sm-6" />
                        <Dropdowninput label="State*" name="state" value={detail.state} onChange={handleOnChange} optionValue={states} classname="col-sm-6" />
                        <Dropdowninput label="City*" name="city" value={detail.city} onChange={handleOnChange} optionValue={cities} classname="col-sm-6" />
                    </Row> <br />
                    <Button type="submit">Submit</Button>

                </Form>
                <ToastContainer />
            </div>
            <div className="btnRedirect"><input type="button" class="btn btn-light btn-lg" value="Login" onClick={handleLogin} /></div>
        </div>
    );
}
export default Signup;