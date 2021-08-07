import React from "react";
import { Col, Form } from "react-bootstrap";
const Inputbox = (props) =>
    <Col className={props.classname}>
        <Form.Group className="mb-3" controlId={`validation${props.name}`}>
            <Form.Control type={props.type} value={props.value} name={props.name} placeholder={props.label} onChange={props.onChange} required></Form.Control>
            <Form.Control.Feedback type="invalid">
                {props.invalidFeedBack}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
                {props.validFeedBack}
            </Form.Control.Feedback>
        </Form.Group>
    </Col>
export default Inputbox;