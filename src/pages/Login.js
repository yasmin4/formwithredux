import React, { useState } from "react";
import Inputbox from "../componet/Inputbox";
import 'bootstrap/dist/css/bootstrap.css';
import { Row } from 'react-bootstrap';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";

const Login = () => {
    const [loginDetail, setloginDetail] = useState({
        email: '',
        password: ''
    })
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    let { record } = useSelector((state) => state.formRecordReducer);

    const handleOnChange = (event) => {
        setloginDetail({ ...loginDetail, ...{ [event.target.name]: event.target.value } })
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        let userExit = false;
        let i;
        let index;
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            for (i = 0; i < record.length; i++) {
                if (
                    record[i]["email"] == loginDetail.email &&
                    record[i]['password'] == loginDetail.password
                ) {
                    userExit = true;
                    index = i;
                }
            }

            if (userExit) {
                localStorage.setItem('loginUserIndex', index);
                history.push(`/dashboard`);
            } else {
                toast.error("this email adress or password don't match",
                    {
                        position: toast.POSITION.BOTTOM_RIGHT

                    });
            }
        }
        setValidated(true);
    };

    const handleSignup = () => {
        history.push('/');
    };

    return (
        <div>
            <div className="formContainer">
                <h3>Log In</h3>
                <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
                    <Row>
                        <Inputbox
                            label="Email"
                            type="email"
                            name='email'
                            value={loginDetail.email}
                            onChange={handleOnChange}
                            validFeedback="valid"
                            invalidFeedBack="Plese Enter Valid Email Address"
                            classname="col-sm-12"
                        />
                    </Row>
                    <Row>
                        <Inputbox
                            label="password"
                            type="password"
                            name="password"
                            value={loginDetail.password}
                            onChange={handleOnChange}
                            validFeedback="valid"
                            invalidFeedBack="Please Enter your Password"
                            classname="col-sm-12"
                        />
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form>
                <ToastContainer autoClose={1000} />
            </div>
            <div className="btnRedirect">
                <input type="button" class="btn btn-light btn-lg" value="Sign Up" onClick={handleSignup} />
            </div>
        </div>
    );
}
export default Login;